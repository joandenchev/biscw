import { reactive } from "vue";
export const globals = reactive({})

/*
activeDbName                -> set in DbSelector.vue onMounted | shows the selected db which is chosen in the selector
splitHovered                -> set in Global.vue onMounted =splitHovered | only defined on touch devices, enables resizing
leftTouchResizeToggleHidden -> set in Global.vue onMounted | only defined on touch devices and is true when the left button should be hidden, false when it should be shown
leftTouchToggleDiv          -> set in TouchResizeToggle.vue onMounted | only defined on touch devices, it's a ref to the left button element (id=="leftTouchToggle")
 */