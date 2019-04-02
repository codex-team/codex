module.exports = require('@codexteam/reactions');

// const Reactions = require('@codexteam/reactions');
//
// /**
//  * Module for pages using Editor
//  */
// class ReactionsModule {
//
//     /**
//      * Create a new Reactions instance
//      * @param {object} settings — module settings
//      * @param {string} settings.holderId — name for a Reactions holder element
//      */
//     init(settings) {
//
//         /**
//          * If holderId is missing then do nothing
//          */
//         if (!settings.holderId) return;
//
//         /**
//          * Try to find holder element with given id
//          * @type {HTMLElement}
//          */
//         const holder = document.getElementById(settings.holderId);
//
//         /**
//          * If holder element is missing then do nothing
//          */
//         if (!holder) return;
//
//         /**
//          * Init Reactions module
//          */
//         return new Reactions({
//             /**
//              * Holder element
//              */
//             parent: `#${settings.holderId}`,
//
//             /**
//              * Text before buttons
//              */
//             title: '',
//
//             /**
//              * Define buttons
//              */
//             reactions: ['👍', '❤️', '👎']
//         });
//
//     }
//
// }
//
// module.exports = new ReactionsModule();