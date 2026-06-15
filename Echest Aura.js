script.description = "Echest Aura.";
script.allowBind = true;
script.allowHold = true;

var ECHEST_ID = 130;
var RANGE = 5;
var EYE_HEIGHT = 1.62;
var REOPEN_DELAY = 3;

var scanDelay = new IntSetting(script, "Scan Delay", "Delay between scans in ticks.", 1, 1, 20, 1);
var turnSpeed = new IntSetting(script, "Rotation Speed", "How fast to rotate.", 180, 10, 720, 10);
var closeOnRelease = new BooleanSetting(script, "Close GUI On Release", "Close the current GUI when the keybind is released.", true);
var closeDelay = new IntSetting(script, "Close GUI Delay", "Ticks to wait before closing the GUI.", 0, 0, 10, 1);

closeDelay.visible(() => closeOnRelease.getValue());

var ticks = 0;
var chest = null;
var rotated = false;
var clickWait = 0;
var reopenWait = 0;
var usePulse = 0;
var holdingUse = false;
var hadChestGui = false;

function chestGuiOpen() {
    return mc.currentScreen != null && ("" + mc.currentScreen).indexOf("GuiChest") != -1;
}

function stopUsingItem() {
    if (holdingUse) {
        mc.gameSettings.keyBindUseItem.keyDown = false;
        holdingUse = false;
    }

    usePulse = 0;
}

function clearTarget() {
    chest = null;
    rotated = false;
    clickWait = 0;
}

function resetScript() {
    ticks = 0;
    reopenWait = 0;
    hadChestGui = false;
    clearTarget();
    stopUsingItem();
}

script.onEnable(function() {
    resetScript();
});

script.onDisable(function() {
    stopUsingItem();

    if (closeOnRelease.getValue() && mc.currentScreen != null) {
        var until = time.getTimeMS() + closeDelay.getValue() * 50;

        while (time.getTimeMS() < until) {}

        if (mc.currentScreen != null) {
            mc.closeUI();
        }
    }

    resetScript();
});

function getRotations(pos) {
    var x = pos.posX + 0.5 - mc.player.posX;
    var y = pos.posY + 0.5 - (mc.player.posY + EYE_HEIGHT);
    var z = pos.posZ + 0.5 - mc.player.posZ;
    var flatDist = Math.sqrt(x * x + z * z);

    var yaw = Math.atan2(z, x) * 180.0 / Math.PI - 90.0;
    var pitch = -(Math.atan2(y, flatDist) * 180.0 / Math.PI);

    if (pitch > 90.0) pitch = 90.0;
    if (pitch < -90.0) pitch = -90.0;

    return { yaw: yaw, pitch: pitch };
}

function findChest() {
    if (mc.player == null || mc.world == null) return null;

    var px = Math.floor(mc.player.posX);
    var py = Math.floor(mc.player.posY);
    var pz = Math.floor(mc.player.posZ);

    var closest = null;
    var closestDist = 999999;
    var rangeSq = RANGE * RANGE;

    for (var x = px - RANGE; x <= px + RANGE; x++) {
        for (var y = py - RANGE; y <= py + RANGE; y++) {
            if (y < 0 || y > 255) continue;

            for (var z = pz - RANGE; z <= pz + RANGE; z++) {
                var dx = x - px;
                var dy = y - py;
                var dz = z - pz;
                var dist = dx * dx + dy * dy + dz * dz;

                if (dist > rangeSq || dist >= closestDist) continue;

                var pos = new BlockPos(x, y, z);

                if (pos.getBlockId() == ECHEST_ID) {
                    closest = pos;
                    closestDist = dist;
                }
            }
        }
    }

    return closest;
}

function lookingAtChest() {
    if (chest == null || mc.objectMouseOver == null) return false;

    var hitPos = mc.objectMouseOver.blockPos;
    if (hitPos == null || hitPos.getBlockId() != ECHEST_ID) return false;

    return hitPos.posX == chest.posX &&
           hitPos.posY == chest.posY &&
           hitPos.posZ == chest.posZ;
}

function clickChest() {
    if (chest == null || clickWait > 0 || reopenWait > 0 || mc.currentScreen != null) return;
    if (chestGuiOpen()) return;

    if (lookingAtChest()) {
        var hit = mc.objectMouseOver;
        var side = hit.sideHit || "UP";
        var vec = hit.hitVec || new Vec3(chest.posX + 0.5, chest.posY + 0.5, chest.posZ + 0.5);

        mc.playerController.rightClickBlock(chest, side, vec);
        clickWait = REOPEN_DELAY;
        return;
    }

    if (rotated) {
        mc.gameSettings.keyBindUseItem.keyDown = true;
        holdingUse = true;
        usePulse = 2;
        clickWait = REOPEN_DELAY;
    }
}

rotationManager.setPriority(20);

rotationManager.onRotate(function() {
    if (mc.player == null || mc.world == null || chest == null || mc.currentScreen != null) {
        rotated = false;
        return;
    }

    var angle = getRotations(chest);
    rotated = rotationManager.rotate(angle.yaw, angle.pitch, turnSpeed.getValue());
});

script.addListener("PreTickEvent", function(event) {
    if (usePulse > 0 && --usePulse <= 0) stopUsingItem();
    if (clickWait > 0) clickWait--;
    if (reopenWait > 0) reopenWait--;

    var guiOpen = chestGuiOpen();

    if (hadChestGui && !guiOpen) {
        reopenWait = REOPEN_DELAY;
    }

    hadChestGui = guiOpen;

    if (mc.player == null || mc.world == null || mc.currentScreen != null) {
        clearTarget();
        stopUsingItem();
        return;
    }

    if (++ticks >= scanDelay.getValue()) {
        ticks = 0;
        chest = findChest();
        rotated = false;
    }

    clickChest();
});
