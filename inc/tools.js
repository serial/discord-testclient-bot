const { botAdminIds }    = require('../config.json');

module.exports = {

    isAdmin: function (user) {

        /*
        if (botAdminIds.includes(user)) {
            return true;
        } else {
            return false;
        }
        */

        //simplified shorthand
        return !!botAdminIds.includes(user);

    }

}