import { reactive } from "vue";
export const globals = reactive({})

/*
resizing                    -> set in Global.vue =resizing | ref bool, true when the user is resizing the tabs
touchDisplay                -> set in Global.vue onBeforeMounted | ref bool, true when the user is using a touch device
splitHovered                -> set in Global.vue onMounted if the user is using a touch device =splitHovered | ref bool, toggle the resizing
activeDbName                -> set in DbSelector.vue onMounted | shows the selected db which is chosen in the selector
leftTouchResizeToggleHidden -> set in Global.vue onMounted | it's only defined on touch devices and is true when the left button should be hidden, false when it should be shown
leftTouchToggleDiv          -> set in TouchResizeToggle.vue onMounted | ref to the left button element (id=="leftTouchToggle")
 */