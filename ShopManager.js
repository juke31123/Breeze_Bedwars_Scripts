//======================================================
//Made by juke1
//Inspiration take from shoffli
//======================================================

script.description = "Bedwars Shopmanger";
script.allowBind = true;
script.allowHold = false;

// =====================================================
// Settings
// =====================================================

var useQuickBuy = new BooleanSetting(script, "Use QuickBuy", "Use default Quick Buy slots when possible", false);
var delayTicks = new IntSetting(script, "Click Delay", "Ticks between clicks", 5, 1, 10);
var mainQueueRefreshSeconds = new IntSetting(script, "Refresh", "Lower number faster Refresh", 3, 1, 5);

var swordTarget = new ModeSetting(script, "Sword Target", "Sword upgrade target", "Off", ["Off", "Stone", "Iron", "Diamond"]);
var swordSmartSkip = new BooleanSetting(script, "Sword Smart Skip", "Buy weaker sword while target is not affordable", true);
var swordPriority = new IntSetting(script, "Sword Priority", "lower number higher priority", 1, 1, 10);

var armorTarget = new ModeSetting(script, "Armor Target", "Armor upgrade target", "Off", ["Off", "Chainmail", "Iron", "Diamond"]);
var armorSmartSkip = new BooleanSetting(script, "Armor Smart Skip", "Buy weaker armor while target is not affordable", true);
var armorPreferDiamondOverSword = new BooleanSetting(script, "Diamond Prio", "If you have 6 emeralds, buy Diamond Armor before Diamond Sword", false);
var armorPriority = new IntSetting(script, "Armor Priority", "lower number higher priority", 6, 1, 10);

var buytools = new BooleanSetting(script, "Tool Manager", "", false);

var pickaxeTarget = new ModeSetting(script, "Pickaxe Target", "Pickaxe upgrade target", "Off", ["Off", "Level 1", "Level 2", "Level 3", "Level 4"]);
var pickaxePriority = new IntSetting(script, "Pickaxe Priority", "lower number higher priority", 3, 1, 10);

var axeTarget = new ModeSetting(script, "Axe Target", "Axe upgrade target", "Off", ["Off", "Level 1", "Level 2", "Level 3", "Level 4"]);
var axePriority = new IntSetting(script, "Axe Priority", "lower number higher priority", 4, 1, 10);

var shearsEnabled = new BooleanSetting(script, "Shears", "Buy shears", false);
var shearsPriority = new IntSetting(script, "Shears Priority", "lower number higher priority", 5, 1, 10);

var woolEnabled = new BooleanSetting(script, "Wool", "Buy wool", true);
var woolTargetAmount = new IntSetting(script, "Wool Amount", "Target wool blocks in inventory", 64, 16, 256);
var woolPriority = new IntSetting(script, "Wool Priority", "lower number higher priority", 2, 1, 10);

var goldenAppleEnabled = new BooleanSetting(script, "Golden Apple", "Buy golden apples", false);
var goldenAppleTargetAmount = new IntSetting(script, "Gap Amount", "Target golden apples in inventory", 1, 1, 16);
var goldenAppleWaitUntilBought = new ModeSetting(script, "Gap Wait Until Bought", "Do not buy golden apples until selected upgrade is bought", "Off", ["Off", "Sword", "Armor", "Both"]);
var goldenApplePriority = new IntSetting(script, "Gap Priority", "lower number higher priority", 7, 1, 10);

var buyupgrades = new BooleanSetting(script, "Upgrade Manager", "", false);

var sharpnessEnabled = new BooleanSetting(script, "Sharpness", "Buy Sharpened Swords", false);
var sharpnessPriority = new IntSetting(script, "Sharpness Priority", "lower number higher priority", 1, 1, 10);

var protectionTarget = new ModeSetting(script, "Protection Target", "Reinforced Armor target", "Off", ["Off", "Protection 1", "Protection 2", "Protection 3", "Protection 4"]);
var protectionPriority = new IntSetting(script, "Protection Priority", "lower number higher priority", 2, 1, 10);

var maniacMinerTarget = new ModeSetting(script, "Maniac Miner Target", "Maniac Miner target", "Off", ["Off", "Maniac Miner 1", "Maniac Miner 2"]);
var maniacMinerPriority = new IntSetting(script, "Maniac Miner Priority", "lower number higher priority", 3, 1, 10);

var forgeTarget = new ModeSetting(script, "Forge Target", "Iron Forge target", "Off", ["Off", "Forge 1", "Forge 2", "Forge 3", "Forge 4"]);
var forgePriority = new IntSetting(script, "Forge Priority", "lower number higher priority", 4, 1, 10);

var healPoolEnabled = new BooleanSetting(script, "Heal Pool", "Buy Heal Pool", false);
var healPoolPriority = new IntSetting(script, "Heal Pool Priority", "lower number higher priority", 5, 1, 10);

var cushionedBootsTarget = new ModeSetting(script, "Cushioned Boots Target", "Cushioned Boots target", "Off", ["Off", "Cushioned Boots 1", "Cushioned Boots 2"]);
var cushionedBootsPriority = new IntSetting(script, "Cushioned Boots Priority", "lower number higher priority", 6, 1, 10);

var debugConsole = new BooleanSetting(script, "Debug Console", "Print debug logs", false);

// =====================================================
// Setting Visibility
// =====================================================

swordSmartSkip.visible(() => !swordTarget.is("Off"));
swordPriority.visible(() => !swordTarget.is("Off"));

armorSmartSkip.visible(() => !armorTarget.is("Off"));
armorPreferDiamondOverSword.visible(() => armorTarget.is("Diamond"));
armorPriority.visible(() => !armorTarget.is("Off"));

pickaxeTarget.visible(() => buytools.getValue());
axeTarget.visible(() => buytools.getValue());
shearsEnabled.visible(() => buytools.getValue());

pickaxePriority.visible(() => !pickaxeTarget.is("Off"));
axePriority.visible(() => !axeTarget.is("Off"));
shearsPriority.visible(() => shearsEnabled.getValue());

woolPriority.visible(() => woolEnabled.getValue());
woolTargetAmount.visible(() => woolEnabled.getValue());

goldenApplePriority.visible(() => goldenAppleEnabled.getValue());
goldenAppleTargetAmount.visible(() => goldenAppleEnabled.getValue());
goldenAppleWaitUntilBought.visible(() => goldenAppleEnabled.getValue());

sharpnessEnabled.visible(() => buyupgrades.getValue());
protectionTarget.visible(() => buyupgrades.getValue());
maniacMinerTarget.visible(() => buyupgrades.getValue());
forgeTarget.visible(() => buyupgrades.getValue());
healPoolEnabled.visible(() => buyupgrades.getValue());
cushionedBootsTarget.visible(() => buyupgrades.getValue());

sharpnessPriority.visible(() => sharpnessEnabled.getValue());
protectionPriority.visible(() => !protectionTarget.is("Off"));
maniacMinerPriority.visible(() => !maniacMinerTarget.is("Off"));
forgePriority.visible(() => !forgeTarget.is("Off"));
healPoolPriority.visible(() => healPoolEnabled.getValue());
cushionedBootsPriority.visible(() => !cushionedBootsTarget.is("Off"));

// =====================================================
// Shop Data
// =====================================================

var SHOP_ITEMS = [
    {id: "STONE_SWORD",     name: "Stone Sword",    tab: 2,slot: 19,type: "sword",  level: 1,  cost: {iron: 10}},
    {id: "IRON_SWORD",      name: "Iron Sword",     tab: 2,slot: 20,type: "sword",  level: 2,  cost: {gold: 7}},
    {id: "DIAMOND_SWORD",   name: "Diamond Sword",  tab: 2,slot: 21,type: "sword",  level: 3,  cost: {emerald: 4}},
    {id: "KNOCKBACK_STICK", name: "Knockback Stick",tab: 2,slot: 22,type: "single",            cost: {gold: 5}},
    {id: "CHAINMAIL_ARMOR", name: "Chainmail Armor",tab: 3,slot: 19,type: "armor",  level: 1,  cost: {iron: 24}},
    {id: "IRON_ARMOR",      name: "Iron Armor",     tab: 3,slot: 20,type: "armor",  level: 2,  cost: {gold: 12}},
    {id: "DIAMOND_ARMOR",   name: "Diamond Armor",  tab: 3,slot: 21,type: "armor",  level: 3,  cost: {emerald: 6}},
    {id: "SHEARS",          name: "Shears",         tab: 4,slot: 19,type: "shears",            cost: {iron: 20}},
    {id: "PICKAXE_L1",      name: "Pickaxe Level 1",tab: 4,slot: 20,type: "pickaxe",level: 1,  cost: {iron: 10}},
    {id: "PICKAXE_L2",      name: "Pickaxe Level 2",tab: 4,slot: 20,type: "pickaxe",level: 2,  cost: {iron: 10}},
    {id: "PICKAXE_L3",      name: "Pickaxe Level 3",tab: 4,slot: 20,type: "pickaxe",level: 3,  cost: {gold: 3}},
    {id: "PICKAXE_L4",      name: "Pickaxe Level 4",tab: 4,slot: 20,type: "pickaxe",level: 4,  cost: {gold: 6}},
    {id: "AXE_L1",          name: "Axe Level 1",    tab: 4,slot: 21,type: "axe",    level: 1,  cost: {iron: 10}},
    {id: "AXE_L2",          name: "Axe Level 2",    tab: 4,slot: 21,type: "axe",    level: 2,  cost: {iron: 10}},
    {id: "AXE_L3",          name: "Axe Level 3",    tab: 4,slot: 21,type: "axe",    level: 3,  cost: {gold: 3}},
    {id: "AXE_L4",          name: "Axe Level 4",    tab: 4,slot: 21,type: "axe",    level: 4,  cost: {gold: 6}},
    {id: "WOOL",            name: "Wool",           tab: 1,slot: 19,type: "single",            cost: {iron: 4}},
    {id: "GOLDEN_APPLE",    name: "Golden Apple",   tab: 7,slot: 19,type: "single",            cost: {gold: 3}}
];

var QUICK_BUY_SLOTS = {
    WOOL: 19,
    STONE_SWORD: 20,
    IRON_SWORD: 29,
    CHAINMAIL_ARMOR: 21,
    IRON_ARMOR: 30,
    PICKAXE_L1: 22,
    PICKAXE_L2: 22,
    PICKAXE_L3: 22,
    PICKAXE_L4: 22,
    SHEARS: 31
};

// =====================================================
// State
// =====================================================

var resources = {
    iron: 0,
    gold: 0,
    diamond: 0,
    emerald: 0
};
var lastResources = {
    iron: 0,
    gold: 0,
    diamond: 0,
    emerald: 0
};

var inventoryCounts = {
    wool: 0,
    goldenApple: 0
};

var lastInventoryCounts = {
    wool: 0,
    goldenApple: 0
};

var dirty = {
    iron: true,
    gold: true,
    diamond: true,
    emerald: true
};

var mainQueue = [];
var diamondQueue = [];
var creatorjuke = 0;

var swordLevel = 0;
var armorLevel = 0;
var pickaxeLevel = 0;
var axeLevel = 0;
var hasShears = false;
var sharpnessBought = false;
var protectionLevel = 0;
var maniacMinerLevel = 0;
var forgeLevel = 0;
var healPoolBought = false;
var cushionedBootsLevel = 0;

var wasDead = false;
var currentTab = 0;
var pendingBuy = null;
var pendingUpgradeBuy = null;
var clickWait = 0;
var shopWasOpen = false;
var activeShopType = "none";

var lastWorldKey = "";
var worldInitialized = false;

// =====================================================
// Helpers
// =====================================================

function isDiamondArmorBuy(item) {
    return item && item.id === "DIAMOND_ARMOR";
}

function isDiamondSwordBuy(item) {
    return item && item.id === "DIAMOND_SWORD";
}

function shouldForceDiamondArmorPriority() {
    if (!armorPreferDiamondOverSword.getValue())
        return false;

    if (armorLevel >= 3)
        return false;

    if (armorTargetLevel() < 3)
        return false;

    return resources.emerald >= 6;
}

function shouldWaitForGoldenApple() {
    if (!goldenAppleEnabled.getValue())
        return true;

    if (modeIs(goldenAppleWaitUntilBought, "Off"))
        return false;

    var waitSword = modeIs(goldenAppleWaitUntilBought, "Sword");
    var waitArmor = modeIs(goldenAppleWaitUntilBought, "Armor");
    var waitBoth = modeIs(goldenAppleWaitUntilBought, "Both");

    if (waitSword && swordLevel < 2)
        return true;

    if (waitArmor && armorLevel < 2)
        return true;

    if (waitBoth && (swordLevel < 2 || armorLevel < 2))
        return true;

    return false;
}

function getBuyTab(item) {
    if (
        useQuickBuy.getValue() &&
        QUICK_BUY_SLOTS[item.id] !== undefined
    ) {
        return 0;
    }

    return item.tab;
}

function getBuySlot(item) {
    if (
        useQuickBuy.getValue() &&
        QUICK_BUY_SLOTS[item.id] !== undefined
    ) {
        return QUICK_BUY_SLOTS[item.id];
    }

    return item.slot;
}

function log(msg) {
    if (debugConsole.getValue()) {
        script.log("[AutoBuy] " + msg);
    }
}

function modeIs(setting, value) {
    try {
        return setting.is(value);
    } catch (e) {}

    try {
        return String(setting.getValue()) === value;
    } catch (e2) {}

    return false;
}

function getItem(id) {
    for (var i = 0; i < SHOP_ITEMS.length; i++) {
        if (SHOP_ITEMS[i].id === id) return SHOP_ITEMS[i];
    }

    return null;
}

function getCostCurrency(item) {
    if (!item || !item.cost) return null;

    if (item.cost.iron !== undefined) return "iron";
    if (item.cost.gold !== undefined) return "gold";
    if (item.cost.diamond !== undefined) return "diamond";
    if (item.cost.emerald !== undefined) return "emerald";

    return null;
}

function getCostAmount(item) {
    var currency = getCostCurrency(item);
    if (!currency) return 0;

    return item.cost[currency];
}

function canAfford(item, res) {
    var currency = getCostCurrency(item);
    if (!currency) return false;

    return res[currency] >= getCostAmount(item);
}

function cloneResources(res) {
    return {
        iron: res.iron,
        gold: res.gold,
        diamond: res.diamond,
        emerald: res.emerald
    };
}

function clampWoolTarget(value) {
    if (value < 16) value = 16;
    if (value > 256) value = 256;

    return Math.ceil(value / 16) * 16;
}

function getWoolMissingBuys() {
    var target = clampWoolTarget(woolTargetAmount.getValue());
    var missing = target - inventoryCounts.wool;

    if (missing <= 0)
        return 0;

    return Math.ceil(missing / 16);
}

function getGoldenAppleMissingBuys() {
    var target = goldenAppleTargetAmount.getValue();
    var missing = target - inventoryCounts.goldenApple;

    if (missing <= 0)
        return 0;

    return missing;
}

function sortByPriority(a, b) {
    if (shouldForceDiamondArmorPriority()) {
        if (isDiamondArmorBuy(a) && isDiamondSwordBuy(b))
            return -1;

        if (isDiamondSwordBuy(a) && isDiamondArmorBuy(b))
            return 1;
    }

    if (a.priority !== b.priority)
        return a.priority - b.priority;

    return a.order - b.order;
}

function markAllDirty() {
    dirty.iron = true;
    dirty.gold = true;
    dirty.diamond = true;
    dirty.emerald = true;
}

// =====================================================
// Inventory Scanner
// =====================================================

var WOOL_NAMES = [
    "Wool",
    "Orange Wool",
    "Magenta Wool",
    "Light Blue Wool",
    "Yellow Wool",
    "Lime Wool",
    "Pink Wool",
    "Gray Wool",
    "Light Gray Wool",
    "Cyan Wool",
    "Purple Wool",
    "Blue Wool",
    "Brown Wool",
    "Green Wool",
    "Red Wool",
    "Black Wool"
];

function cleanName(name) {
    return String(name).replace(/\u00A7./g, "");
}

function clearResources() {
    resources.iron = 0;
    resources.gold = 0;
    resources.diamond = 0;
    resources.emerald = 0;

    inventoryCounts.wool = 0;
    inventoryCounts.goldenApple = 0;
}

function isWoolName(name) {
    for (var i = 0; i < WOOL_NAMES.length; i++) {
        if (name === WOOL_NAMES[i])
            return true;
    }

    return false;
}

function addResourceByName(name, amount) {
    if (name === "Iron Ingot") {
        resources.iron += amount;
        return;
    }

    if (name === "Gold Ingot") {
        resources.gold += amount;
        return;
    }

    if (name === "Diamond") {
        resources.diamond += amount;
        return;
    }

    if (name === "Emerald") {
        resources.emerald += amount;
        return;
    }

    if (isWoolName(name)) {
        inventoryCounts.wool += amount;
        return;
    }

    if (name === "Golden Apple") {
        inventoryCounts.goldenApple += amount;
        return;
    }
}

function scanResources() {

    clearResources();

    if (mc.player == null || mc.player.inventory == null)
        return;

    var inv = mc.player.inventory;

    var detectedSwordLevel = 0;
    var detectedArmorLevel = 0;
    var detectedPickaxeLevel = 0;
    var detectedAxeLevel = 0;
    var detectedShears = false;

    for (var i = 0; i < 40; i++) {

        var stack = null;

        try {
            stack = inv.getStackInSlot(i);
        } catch (e) {
            stack = null;
        }

        if (stack == null)
            continue;

        var name = "";
        var amount = 1;

        try {
            name = cleanName(stack.getDisplayName());
        } catch (e1) {}

        try {
            amount = stack.stackSize;
        } catch (e2) {}

        addResourceByName(name, amount);

        // =========================
        // Sword Detection
        // =========================

        if (name === "Stone Sword")
            detectedSwordLevel = Math.max(detectedSwordLevel, 1);

        if (name === "Iron Sword")
            detectedSwordLevel = Math.max(detectedSwordLevel, 2);

        if (name === "Diamond Sword")
            detectedSwordLevel = Math.max(detectedSwordLevel, 3);

        // =========================
        // Armor Detection
        // =========================

        if (
            name === "Chainmail Boots" ||
            name === "Chainmail Leggings"
        ) {
            detectedArmorLevel = Math.max(detectedArmorLevel, 1);
        }

        if (
            name === "Iron Boots" ||
            name === "Iron Leggings"
        ) {
            detectedArmorLevel = Math.max(detectedArmorLevel, 2);
        }

        if (
            name === "Diamond Boots" ||
            name === "Diamond Leggings"
        ) {
            detectedArmorLevel = Math.max(detectedArmorLevel, 3);
        }

        // =========================
        // Shears
        // =========================

        if (name === "Shears") {
            detectedShears = true;
        }

        // =========================
        // Pickaxe
        // =========================

        if (name === "Wooden Pickaxe")
            detectedPickaxeLevel = Math.max(detectedPickaxeLevel, 1);

        if (name === "Stone Pickaxe")
            detectedPickaxeLevel = Math.max(detectedPickaxeLevel, 2);

        if (name === "Iron Pickaxe")
            detectedPickaxeLevel = Math.max(detectedPickaxeLevel, 3);

        if (name === "Diamond Pickaxe")
            detectedPickaxeLevel = Math.max(detectedPickaxeLevel, 4);

        // =========================
        // Axe
        // =========================

        if (name === "Wooden Axe")
            detectedAxeLevel = Math.max(detectedAxeLevel, 1);

        if (name === "Stone Axe")
            detectedAxeLevel = Math.max(detectedAxeLevel, 2);

        if (name === "Iron Axe")
            detectedAxeLevel = Math.max(detectedAxeLevel, 3);

        if (name === "Diamond Axe")
            detectedAxeLevel = Math.max(detectedAxeLevel, 4);
    }

    var changed = false;

    if (swordLevel !== detectedSwordLevel) {
        swordLevel = detectedSwordLevel;
        changed = true;
    }

    if (detectedArmorLevel > armorLevel) {
        armorLevel = detectedArmorLevel;
        changed = true;
    }

    if (pickaxeLevel !== detectedPickaxeLevel) {
        pickaxeLevel = detectedPickaxeLevel;
        changed = true;
    }

    if (axeLevel !== detectedAxeLevel) {
        axeLevel = detectedAxeLevel;
        changed = true;
    }

    if (hasShears !== detectedShears) {
        hasShears = detectedShears;
        changed = true;
    }

    if (changed) {
        markAllDirty();

        log(
            "Detected State -> " +
            "Sword=" + swordLevel +
            ", Armor=" + armorLevel +
            ", Pickaxe=" + pickaxeLevel +
            ", Axe=" + axeLevel +
            ", Shears=" + hasShears
        );
    }
}

function updateResourceDirtyFlags() {

    if (resources.iron !== lastResources.iron)
        dirty.iron = true;

    if (resources.gold !== lastResources.gold)
        dirty.gold = true;

    if (resources.diamond !== lastResources.diamond)
        dirty.diamond = true;

    if (resources.emerald !== lastResources.emerald)
        dirty.emerald = true;

    lastResources.iron = resources.iron;
    lastResources.gold = resources.gold;
    lastResources.diamond = resources.diamond;
    lastResources.emerald = resources.emerald;
}

function updateInventoryCountDirtyFlags() {

    if (inventoryCounts.wool !== lastInventoryCounts.wool)
        dirty.iron = true;

    if (inventoryCounts.goldenApple !== lastInventoryCounts.goldenApple)
        dirty.gold = true;

    lastInventoryCounts.wool = inventoryCounts.wool;
    lastInventoryCounts.goldenApple = inventoryCounts.goldenApple;
}

// =====================================================
// Upgrade Targets
// =====================================================

function swordTargetLevel() {
    if (modeIs(swordTarget, "Diamond")) return 3;
    if (modeIs(swordTarget, "Iron")) return 2;
    if (modeIs(swordTarget, "Stone")) return 1;
    return 0;
}

function armorTargetLevel() {
    if (modeIs(armorTarget, "Diamond")) return 3;
    if (modeIs(armorTarget, "Iron")) return 2;
    if (modeIs(armorTarget, "Chainmail")) return 1;
    return 0;
}

function toolTargetLevel(setting) {
    if (modeIs(setting, "Level 4")) return 4;
    if (modeIs(setting, "Level 3")) return 3;
    if (modeIs(setting, "Level 2")) return 2;
    if (modeIs(setting, "Level 1")) return 1;
    return 0;
}

function swordItemForLevel(level) {
    if (level === 3) return getItem("DIAMOND_SWORD");
    if (level === 2) return getItem("IRON_SWORD");
    if (level === 1) return getItem("STONE_SWORD");
    return null;
}

function armorItemForLevel(level) {
    if (level === 3) return getItem("DIAMOND_ARMOR");
    if (level === 2) return getItem("IRON_ARMOR");
    if (level === 1) return getItem("CHAINMAIL_ARMOR");
    return null;
}

function pickaxeItemForLevel(level) {
    return getItem("PICKAXE_L" + level);
}

function axeItemForLevel(level) {
    return getItem("AXE_L" + level);
}

function makeBuy(item, priority, repeats, order) {
    if (!item)
        return null;

    return {
        id: item.id,
        name: item.name,
        tab: getBuyTab(item),
        slot: getBuySlot(item),
        originalTab: item.tab,
        originalSlot: item.slot,
        type: item.type,
        level: item.level || 0,
        cost: item.cost,
        priority: priority,
        repeats: repeats,
        order: order
    };
}

function getSmartSkipBuy(currentLevel, targetLevel, itemForLevel, priority, order) {
    if (targetLevel <= 0 || currentLevel >= targetLevel)
        return null;

    for (var level = targetLevel; level > currentLevel; level--) {
        var item = itemForLevel(level);

        if (item && canAfford(item, resources))
            return makeBuy(item, priority, 1, order);
    }

    return null;
}

function getNextSwordBuy() {
    var target = swordTargetLevel();

    if (target <= 0 || swordLevel >= target)
        return null;

    if (swordSmartSkip.getValue()) {
        return getSmartSkipBuy(
            swordLevel,
            target,
            swordItemForLevel,
            swordPriority.getValue(),
            10
        );
    }

    return makeBuy(
        swordItemForLevel(target),
        swordPriority.getValue(),
        1,
        10
    );
}

function getNextArmorBuy() {
    var target = armorTargetLevel();

    if (target <= 0 || armorLevel >= target)
        return null;

    if (armorSmartSkip.getValue()) {
        return getSmartSkipBuy(
            armorLevel,
            target,
            armorItemForLevel,
            armorPriority.getValue(),
            60
        );
    }

    return makeBuy(
        armorItemForLevel(target),
        armorPriority.getValue(),
        1,
        60
    );
}

function getNextPickaxeBuy() {
    var target = toolTargetLevel(pickaxeTarget);

    if (target <= 0 || pickaxeLevel >= target)
        return null;

    return makeBuy(
        pickaxeItemForLevel(pickaxeLevel + 1),
        pickaxePriority.getValue(),
        1,
        30
    );
}

function getNextAxeBuy() {
    var target = toolTargetLevel(axeTarget);

    if (target <= 0 || axeLevel >= target)
        return null;

    return makeBuy(
        axeItemForLevel(axeLevel + 1),
        axePriority.getValue(),
        1,
        40
    );
}

function protectionTargetLevel() {
    if (modeIs(protectionTarget, "Protection 4")) return 4;
    if (modeIs(protectionTarget, "Protection 3")) return 3;
    if (modeIs(protectionTarget, "Protection 2")) return 2;
    if (modeIs(protectionTarget, "Protection 1")) return 1;
    return 0;
}

function protectionCostForLevel(level) {
    if (level === 1) return 2;
    if (level === 2) return 4;
    if (level === 3) return 8;
    if (level === 4) return 16;

    return 999;
}

function makeUpgradeBuy(id, name, slot, type, level, cost, priority, order) {
    return {
        id: id,
        name: name,
        slot: slot,
        type: type,
        level: level,
        cost: {
            diamond: cost
        },
        priority: priority,
        repeats: 1,
        order: order
    };
}

function getNextSharpnessBuy() {
    if (!sharpnessEnabled.getValue())
        return null;

    if (sharpnessBought)
        return null;

    return makeUpgradeBuy(
        "SHARPNESS",
        "Sharpened Swords",
        10,
        "sharpness",
        1,
        4,
        sharpnessPriority.getValue(),
        10
    );
}

function getNextProtectionBuy() {
    var target = protectionTargetLevel();

    if (target <= 0)
        return null;

    if (protectionLevel >= target)
        return null;

    var nextLevel = protectionLevel + 1;

    return makeUpgradeBuy(
        "PROTECTION_" + nextLevel,
        "Reinforced Armor " + nextLevel,
        11,
        "protection",
        nextLevel,
        protectionCostForLevel(nextLevel),
        protectionPriority.getValue(),
        20
    );
}

function maniacMinerTargetLevel() {
    if (modeIs(maniacMinerTarget, "Maniac Miner 2")) return 2;
    if (modeIs(maniacMinerTarget, "Maniac Miner 1")) return 1;
    return 0;
}

function maniacMinerCostForLevel(level) {
    if (level === 1) return 2;
    if (level === 2) return 4;

    return 999;
}

function forgeTargetLevel() {
    if (modeIs(forgeTarget, "Forge 4")) return 4;
    if (modeIs(forgeTarget, "Forge 3")) return 3;
    if (modeIs(forgeTarget, "Forge 2")) return 2;
    if (modeIs(forgeTarget, "Forge 1")) return 1;
    return 0;
}

function forgeCostForLevel(level) {
    if (level === 1) return 2;
    if (level === 2) return 4;
    if (level === 3) return 6;
    if (level === 4) return 8;

    return 999;
}

function cushionedBootsTargetLevel() {
    if (modeIs(cushionedBootsTarget, "Cushioned Boots 2")) return 2;
    if (modeIs(cushionedBootsTarget, "Cushioned Boots 1")) return 1;
    return 0;
}

function cushionedBootsCostForLevel(level) {
    if (level === 1) return 1;
    if (level === 2) return 2;

    return 999;
}

function getNextManiacMinerBuy() {
    var target = maniacMinerTargetLevel();

    if (target <= 0)
        return null;

    if (maniacMinerLevel >= target)
        return null;

    var nextLevel = maniacMinerLevel + 1;

    return makeUpgradeBuy(
        "MANIAC_MINER_" + nextLevel,
        "Maniac Miner " + nextLevel,
        12,
        "maniac_miner",
        nextLevel,
        maniacMinerCostForLevel(nextLevel),
        maniacMinerPriority.getValue(),
        30
    );
}

function getNextForgeBuy() {
    var target = forgeTargetLevel();

    if (target <= 0)
        return null;

    if (forgeLevel >= target)
        return null;

    var nextLevel = forgeLevel + 1;

    return makeUpgradeBuy(
        "FORGE_" + nextLevel,
        "Iron Forge " + nextLevel,
        19,
        "forge",
        nextLevel,
        forgeCostForLevel(nextLevel),
        forgePriority.getValue(),
        40
    );
}

function getNextHealPoolBuy() {
    if (!healPoolEnabled.getValue())
        return null;

    if (healPoolBought)
        return null;

    return makeUpgradeBuy(
        "HEAL_POOL",
        "Heal Pool",
        20,
        "heal_pool",
        1,
        1,
        healPoolPriority.getValue(),
        50
    );
}

function getNextCushionedBootsBuy() {
    var target = cushionedBootsTargetLevel();

    if (target <= 0)
        return null;

    if (cushionedBootsLevel >= target)
        return null;

    var nextLevel = cushionedBootsLevel + 1;

    return makeUpgradeBuy(
        "CUSHIONED_BOOTS_" + nextLevel,
        "Cushioned Boots " + nextLevel,
        21,
        "cushioned_boots",
        nextLevel,
        cushionedBootsCostForLevel(nextLevel),
        cushionedBootsPriority.getValue(),
        60
    );
}

// =====================================================
// Queue Planning
// =====================================================

function getAllEnabledBuys() {
    var list = [];

    var swordBuy = getNextSwordBuy();
    var armorBuy = getNextArmorBuy();
    var pickaxeBuy = getNextPickaxeBuy();
    var axeBuy = getNextAxeBuy();

    if (swordBuy) list.push(swordBuy);
    if (armorBuy) list.push(armorBuy);
    if (pickaxeBuy) list.push(pickaxeBuy);
    if (axeBuy) list.push(axeBuy);

    if (woolEnabled.getValue()) {
        var woolBuys = getWoolMissingBuys();

        if (woolBuys > 0) {
            list.push(makeBuy(getItem("WOOL"), woolPriority.getValue(), woolBuys, 20));
        }
    }

    if (shearsEnabled.getValue() && !hasShears) {
        list.push(makeBuy(getItem("SHEARS"), shearsPriority.getValue(), 1, 50));
    }

    if (goldenAppleEnabled.getValue() && !shouldWaitForGoldenApple()) {
        var gappleBuys = getGoldenAppleMissingBuys();

        if (gappleBuys > 0) {
            list.push(makeBuy(getItem("GOLDEN_APPLE"), goldenApplePriority.getValue(), gappleBuys, 70));
        }
    }

    list.sort(sortByPriority);
    return list;
}

function getAllEnabledUpgradeBuys() {
    var list = [];

    var sharpnessBuy = getNextSharpnessBuy();
    var protectionBuy = getNextProtectionBuy();
    var maniacMinerBuy = getNextManiacMinerBuy();
    var forgeBuy = getNextForgeBuy();
    var healPoolBuy = getNextHealPoolBuy();
    var cushionedBootsBuy = getNextCushionedBootsBuy();

    if (sharpnessBuy)
        list.push(sharpnessBuy);

    if (protectionBuy)
        list.push(protectionBuy);

    if (maniacMinerBuy)
        list.push(maniacMinerBuy);

    if (forgeBuy)
        list.push(forgeBuy);

    if (healPoolBuy)
        list.push(healPoolBuy);

    if (cushionedBootsBuy)
        list.push(cushionedBootsBuy);

    list.sort(sortByPriority);
    return list;
}

function buildDiamondQueueFromResources() {
    var result = [];
    var simulated = cloneResources(resources);
    var candidates = getAllEnabledUpgradeBuys();

    for (var i = 0; i < candidates.length; i++) {
        var item = candidates[i];

        if (!canAfford(item, simulated))
            continue;

        simulated.diamond -= getCostAmount(item);
        result.push(item);
    }

    result.sort(sortByPriority);
    return result;
}

function rebuildDiamondQueue() {
    diamondQueue = buildDiamondQueueFromResources();

    var names = [];

    for (var i = 0; i < diamondQueue.length; i++) {
        names.push(diamondQueue[i].name);
    }

    log("DiamondQueue: " + (names.length ? names.join(", ") : "empty"));
}

function buildMainQueueFromResources() {
    var result = [];
    var simulated = cloneResources(resources);
    var candidates = getAllEnabledBuys();

    for (var i = 0; i < candidates.length; i++) {
        var item = candidates[i];
        var currency = getCostCurrency(item);

        if (!currency)
            continue;

        var cost = getCostAmount(item);
        var repeats = item.repeats || 1;

        for (var r = 0; r < repeats; r++) {
            if (simulated[currency] < cost)
                break;

            simulated[currency] -= cost;
            result.push(item);
        }
    }

    result.sort(sortByPriority);
    return result;
}

function rebuildMainQueue() {
    mainQueue = buildMainQueueFromResources();

    var names = [];

    for (var i = 0; i < mainQueue.length; i++) {
        names.push(mainQueue[i].name);
    }

    log("MainQueue: " + (names.length ? names.join(", ") : "empty"));
    log("Inventory: wool=" + inventoryCounts.wool + ", goldenApple=" + inventoryCounts.goldenApple);

    creatorjuke = mainQueueRefreshSeconds.getValue() * 20;
}

function forceReplan() {
    rebuildMainQueue();
    rebuildDiamondQueue();

    dirty.iron = false;
    dirty.gold = false;
    dirty.diamond = false;
    dirty.emerald = false;
}

// =====================================================
// GUI / Clicking
// =====================================================

function getVal(obj, name) {
    try {
        var v = obj[name];

        if (typeof v === "function")
            return v.call(obj);

        return v;
    } catch (e) {
        return undefined;
    }
}

function cleanShopName(name) {
    return String(name).replace(/\u00A7./g, "");
}

function getContainer() {
    var screen = mc.currentScreen;

    var candidates = [
        "inventorySlots",
        "container",
        "field_147002_h"
    ];

    for (var i = 0; i < candidates.length; i++) {
        var container = getVal(screen, candidates[i]);

        if (container !== undefined && container !== null)
            return container;
    }

    return null;
}

function getContainerSlotStack(slotId) {
    var container = getContainer();

    if (container === null)
        return null;

    try {
        var slotObj = container.getSlot(slotId);

        if (!slotObj)
            return null;

        return slotObj.getStack();
    } catch (e) {
        return null;
    }
}

function getStackName(stack) {
    if (stack === null)
        return "";

    try {
        return cleanShopName(stack.getDisplayName());
    } catch (e) {
        return "";
    }
}

function getStackId(stack) {
    if (stack === null)
        return -1;

    try {
        if (typeof stack.getItemId === "function")
            return stack.getItemId();
    } catch (e) {}

    try {
        return stack.itemID;
    } catch (e2) {}

    return -1;
}

function getStackItemId(stack) {
    return getStackId(stack);
}

function isShopOpen() {
    try {
        if (!(mc.currentScreen instanceof GuiChest))
            return false;
    } catch (e) {
        return false;
    }

    var stack = getContainerSlotStack(0);

    if (stack === null)
        return false;

    var name = getStackName(stack);

    if (name === "Quick Buy")
        return true;

    return false;
}

function isUpgradeShopOpen() {
    try {
        if (!(mc.currentScreen instanceof GuiChest))
            return false;
    } catch (e) {
        return false;
    }

    var stack = getContainerSlotStack(20);

    if (stack === null)
        return false;

    return getStackItemId(stack) === 138;
}

function getCurrentShopType() {
    if (isShopOpen())
        return "item";

    if (isUpgradeShopOpen())
        return "upgrade";

    return "none";
}

function getWindowId() {
    var container = getContainer();

    if (container === null)
        return undefined;

    var id =
        getVal(container, "windowId") ||
        getVal(container, "windowID") ||
        getVal(container, "field_75152_c");

    if (id !== undefined && id !== null)
        return id;

    return undefined;
}

function clickSlot(slotId) {
    var windowId = getWindowId();

    if (windowId === undefined) {
        log("Cannot click: windowId missing");
        return false;
    }

    try {
        mc.playerController.windowClick(
            windowId,
            slotId,
            0,
            0,
            mc.player
        );

        log("Clicked slot " + slotId);
        return true;
    } catch (e) {
        log("Click error: " + e);
        return false;
    }
}

function applyBuy(item) {
    if (item.type === "sword") {
        swordLevel = Math.max(swordLevel, item.level);
    } else if (item.type === "armor") {
        armorLevel = Math.max(armorLevel, item.level);
    } else if (item.type === "pickaxe") {
        pickaxeLevel = Math.max(pickaxeLevel, item.level);
    } else if (item.type === "axe") {
        axeLevel = Math.max(axeLevel, item.level);
    } else if (item.type === "shears") {
        hasShears = true;
    }

    forceReplan();
}

function applyUpgradeBuy(item) {
    if (item.type === "sharpness") {
        sharpnessBought = true;
    } else if (item.type === "protection") {
        protectionLevel = Math.max(protectionLevel, item.level);
    } else if (item.type === "maniac_miner") {
        maniacMinerLevel = Math.max(maniacMinerLevel, item.level);
    } else if (item.type === "forge") {
        forgeLevel = Math.max(forgeLevel, item.level);
    } else if (item.type === "heal_pool") {
        healPoolBought = true;
    } else if (item.type === "cushioned_boots") {
        cushionedBootsLevel = Math.max(cushionedBootsLevel, item.level);
    }

    log(
        "Upgrade State -> " +
        "Sharpness=" + sharpnessBought +
        ", Protection=" + protectionLevel +
        ", ManiacMiner=" + maniacMinerLevel +
        ", Forge=" + forgeLevel +
        ", HealPool=" + healPoolBought +
        ", CushionedBoots=" + cushionedBootsLevel
    );

    forceReplan();
}

// =====================================================
// Death Handling
// =====================================================

function getHealth() {
    try {
        if (typeof mc.player.getHealth === "function")
            return mc.player.getHealth();
    } catch (e) {}

    try {
        return mc.player.health;
    } catch (e2) {}

    return 20;
}

function isDead() {
    try {
        if (mc.player.isDead)
            return true;
    } catch (e) {}

    return getHealth() <= 0;
}

function handleDeath() {
    var dead = isDead();

    if (dead && !wasDead) {
        log("Death detected");

        swordLevel = 0;

        if (pickaxeLevel > 1)
            pickaxeLevel--;

        if (axeLevel > 1)
            axeLevel--;

        markAllDirty();
    }

    wasDead = dead;
}

// =====================================================
// World Change Detection
// =====================================================

function getWorldKey() {
    try {
        if (mc.world === null || mc.world === undefined)
            return "null";

        return String(mc.world);
    } catch (e) {
        return "error";
    }
}

function resetForNewWorld() {

    swordLevel = 0;
    armorLevel = 0;

    pickaxeLevel = 0;
    axeLevel = 0;

    hasShears = false;

    sharpnessBought = false;
    protectionLevel = 0;
    maniacMinerLevel = 0;
    forgeLevel = 0;
    healPoolBought = false;
    cushionedBootsLevel = 0;
    diamondQueue = [];
    pendingUpgradeBuy = null;

    mainQueue = [];
    pendingBuy = null;

    currentTab = 0;
    clickWait = 0;
    shopWasOpen = false;

    markAllDirty();

    log("World changed -> reset state");
    log(
        "Reset -> Sword=" + swordLevel +
        ", Armor=" + armorLevel +
        ", Pickaxe=" + pickaxeLevel +
        ", Axe=" + axeLevel +
        ", Shears=" + hasShears
    );
}

function handleWorldChange() {

    var currentKey = getWorldKey();

    if (!worldInitialized) {
        worldInitialized = true;
        lastWorldKey = currentKey;
        return;
    }

    if (currentKey !== lastWorldKey) {

        log("World changed detected");

        lastWorldKey = currentKey;

        resetForNewWorld();
    }
}

// =====================================================
// Tick
// =====================================================

script.addListener("PreTickEvent", function() {

    handleWorldChange();
    scanResources();
    updateResourceDirtyFlags();
    updateInventoryCountDirtyFlags();

    var shopType = getCurrentShopType();

    if (shopType === "none") {
        shopWasOpen = false;
        activeShopType = "none";
        currentTab = 0;
        pendingBuy = null;
        pendingUpgradeBuy = null;
        clickWait = 0;

        return;
    }

    if (shopType !== activeShopType) {
        activeShopType = shopType;
        shopWasOpen = true;
        currentTab = 0;
        pendingBuy = null;
        pendingUpgradeBuy = null;
        clickWait = 0;

        if (shopType === "item") {
            log("Item shop opened.");
        } else if (shopType === "upgrade") {
            log("Permanent Upgrade shop opened.");

            rebuildDiamondQueue();

            log(
                "Upgrade Debug -> Diamonds=" + resources.diamond +
                ", QueueSize=" + diamondQueue.length +
                ", Sharpness=" + sharpnessBought +
                ", Protection=" + protectionLevel +
                ", ManiacMiner=" + maniacMinerLevel +
                ", Forge=" + forgeLevel +
                ", HealPool=" + healPoolBought +
                ", CushionedBoots=" + cushionedBootsLevel
            );
        }
    }

    if (shopType === "upgrade") {
        if (clickWait > 0) {
            clickWait--;
            return;
        }

        if (diamondQueue.length === 0) {
            rebuildDiamondQueue();
        }

        if (pendingUpgradeBuy === null) {
            if (diamondQueue.length === 0) {
                return;
            }

            pendingUpgradeBuy = diamondQueue.shift();

            log(
                "Next upgrade buy: " + pendingUpgradeBuy.name +
                " Slot=" + pendingUpgradeBuy.slot +
                " Cost=" + getCostAmount(pendingUpgradeBuy) +
                " Diamonds=" + resources.diamond
            );
        }

        if (canAfford(pendingUpgradeBuy, resources)) {
            if (clickSlot(pendingUpgradeBuy.slot)) {
                log("Clicked upgrade slot: " + pendingUpgradeBuy.slot + " / " + pendingUpgradeBuy.name);
                applyUpgradeBuy(pendingUpgradeBuy);
            } else {
                log("Upgrade click failed: " + pendingUpgradeBuy.name);
            }
        } else {
            log(
                "Skipped upgrade not affordable: " +
                pendingUpgradeBuy.name +
                " Need=" + getCostAmount(pendingUpgradeBuy) +
                " Diamonds=" + resources.diamond
            );
        }

        pendingUpgradeBuy = null;
        clickWait = delayTicks.getValue();
        return;
    }
    creatorjuke--;
    if (creatorjuke <= 0 || dirty.iron || dirty.gold || dirty.diamond || dirty.emerald) {
        rebuildMainQueue();
        rebuildDiamondQueue();
        dirty.iron = false;
        dirty.gold = false;
        dirty.diamond = false;
        dirty.emerald = false;
    }

    handleDeath();

    if (!isShopOpen()) {
        shopWasOpen = false;
        currentTab = 0;
        pendingBuy = null;
        clickWait = 0;
        return;
    }

    if (!shopWasOpen) {
        shopWasOpen = true;
        currentTab = 0;
        log("Shop opened.");
    }

    if (clickWait > 0) {
        clickWait--;
        return;
    }

    if (pendingBuy === null) {
        if (mainQueue.length === 0) {
            return
        };
        pendingBuy = mainQueue.shift();
        log("Next buy: " + pendingBuy.name);
    }

    if (pendingBuy.tab !== currentTab) {
        if (clickSlot(pendingBuy.tab)) {
            currentTab = pendingBuy.tab;
            clickWait = delayTicks.getValue();
        }
        return;
    }

    if (canAfford(pendingBuy, resources)) {
        if (clickSlot(pendingBuy.slot)) {
            log("Bought " + pendingBuy.name);
            applyBuy(pendingBuy);
        }
    } else {
        log("Skipped not affordable: " + pendingBuy.name);
    }

    pendingBuy = null;
    clickWait = delayTicks.getValue();
});