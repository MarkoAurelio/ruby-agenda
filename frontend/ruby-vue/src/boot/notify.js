import { Notify } from 'quasar';

Notify.setDefaults({
  timeout: 2500,
  color: 'secondary',
  position: 'bottom',
  textColor: 'white',
  classes: 'notify-default',
  icon: '🚀',
  iconColor: 'white',
  progress: true,
});

Notify.registerType('error', {
  timeout: 3000,
  icon: 'fa-light fa-circle-exclamation',
  iconColor: 'white',
  color: 'red',
});
