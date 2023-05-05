"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Notifier;
(function (Notifier) {
    let NotificationPriority;
    (function (NotificationPriority) {
        NotificationPriority[NotificationPriority["Min"] = 1] = "Min";
        NotificationPriority[NotificationPriority["Low"] = 2] = "Low";
        NotificationPriority[NotificationPriority["Default"] = 3] = "Default";
        NotificationPriority[NotificationPriority["High"] = 4] = "High";
        NotificationPriority[NotificationPriority["Max"] = 5] = "Max";
    })(NotificationPriority = Notifier.NotificationPriority || (Notifier.NotificationPriority = {}));
})(Notifier || (Notifier = {}));
exports.default = Notifier;
