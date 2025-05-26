import { reactive } from "vue";
export const globals = reactive({})

/*
resizing     -> Global.vue =resizing | ref bool, true when the user is resizing the tabs
touchDisplay -> set in Global.vue onMounted | ref bool, true when the user is using a touch device
splitHovered -> set in Global.vue onMounted if the user is using a touch device =splitHovered | ref bool, toggle the resizing
activeDbName -> set in DbSelector.vue onMounted | shows the selected db which is chosen in the selector
 */