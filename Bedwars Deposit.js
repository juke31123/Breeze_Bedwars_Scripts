script.description = "Moves Bedwars Recourses into your enderchest upon opening.";
var clickDelayTicks = new IntSetting(script, "Click Delay", "Ticks between move batches.", 3, 1, 10, 1);
var interactionsPerTick = new IntSetting(script, "Interactions Per Tick", "Stacks to move per tick. Higher is faster but less reliable.", 1, 1, 10, 1);
var targets = [265, 266, 388, 264]; // iron, gold, emerald, diamond
var ecOpen = false, done = false, windowId = -1, chestSlots = 27;
var openDelay = 0, clickDelay = 0;
function reset() {
    ecOpen = false;
    done = false;
    windowId = -1;
    chestSlots = 27;
    openDelay = 0;
    clickDelay = 0;
}
function isTarget(id) {
    return targets.indexOf(id) !== -1;
}
function findTargetSlot(clicked) {
    if (!ecOpen || mc.currentScreen == null || mc.currentScreen.container == null) return -1;
    var c = mc.currentScreen.container;
    for (var slot = chestSlots; slot < c.getSize(); slot++) {
        if (clicked[slot]) continue;
        var cs = c.getSlot(slot);
        if (cs == null) continue;
        var stack = cs.getStack();
        if (stack != null && stack.exists() && isTarget(stack.getItemId())) return slot;
    }
    return -1;
}
function moveOne(clicked) {
    if (windowId === -1 || mc.playerController == null) return false;
    var slot = findTargetSlot(clicked);
    if (slot === -1) {
        if (!done) script.log("Finished storing resources.");
        done = true;
        return false;
    }
    mc.playerController.windowClick(windowId, slot, 0, 1);
    clicked[slot] = true;
    return true;
}
script.addListener("PacketReceiveEvent", (event) => {
    var p = event.packet;
    if (p instanceof S2DPacketOpenWindow) {
        var title = String(p.getWindowTitle()).toLowerCase();
        if (title.indexOf("ender") !== -1 && p.getSlotCount() === 27) {
            ecOpen = true;
            done = false;
            windowId = p.getWindowId();
            chestSlots = p.getSlotCount();
            openDelay = 3;
            clickDelay = 0;
            script.log("Ender Chest opened. Storing resources.");
        } else {
            reset();
        }
    }
    if (p instanceof S2EPacketCloseWindow) reset();
});
script.addListener("PreTickEvent", (event) => {
    if (!ecOpen || done) return;
    if (openDelay > 0) {
        openDelay--;
        return;
    }
    if (clickDelay > 0) {
        clickDelay--;
        return;
    }
    var clicked = {};
    for (var i = 0; i < interactionsPerTick.getValue(); i++) {
        if (!moveOne(clicked)) break;
    }
    clickDelay = clickDelayTicks.getValue();
});