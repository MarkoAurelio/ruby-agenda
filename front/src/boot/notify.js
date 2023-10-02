import { Notify } from 'quasar';

Notify.setDefaults({
  timeout: 2500,
  color: "secondary",
  position: "bottom",
  textColor: "white",
  classes: "notify-default",
  iconColor: "white",
  progress: true,
});

Notify.registerType("error", {
  timeout: 3000,
  icon: "fa-solid fa-circle-exclamation",
  iconColor: "white",
  color: "red",
});
