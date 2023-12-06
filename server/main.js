import {Meteor} from 'meteor/meteor';
import {Accounts} from 'meteor/accounts-base';
import {CountriesCollection} from '../imports/api/collections/CountriesCollection';

Meteor.startup(() => {
    // Create an admin user if no users exist
    if (Meteor.users.find().count() === 0) {
        const userId = Accounts.createUser({
            username: 'admin',
            password: 'admin',
        });

    }
});

Meteor.methods({
    'user.login'({username, password}) {
        const user = Meteor.users.findOne({username});

        return !!(user && Accounts._checkPassword(user, password));
    },
});

const defineCrudMethods = (collection) => {
    Meteor.methods({
        [`${collection._name}.insert`](document) {
            const newDocumentId = collection.insert(document);
            return newDocumentId;
        },

        [`${collection._name}.update`](documentId, updatedDocument) {
            const result = collection.update({_id: documentId}, updatedDocument);
            return result;
        },

        [`${collection._name}.delete`](documentId) {
            const result = collection.remove(documentId);
            return result;
        },
    });

    Meteor.publish(`${collection._name}`, function () {
        return collection.find();
    });
};

defineCrudMethods(CountriesCollection);
