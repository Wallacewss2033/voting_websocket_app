import { Notify } from "quasar";

export const NotifySuccess = (message) => Notify.create({
    type: 'positive',
    message: message,
});
export const NotifyFails = (message) => Notify.create({
    type: 'negative',
    message: message,
});

