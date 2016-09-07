import { Meteor } from 'meteor/meteor';

import { Repertory } from '../../repertory/collection.js';
import { Teams } from '../../teams/collection.js';

Meteor.publish('contactPage', function(repertoryId) {
  const repertory = Repertory.findOne(repertoryId);
  let userToSubscribe = [];
  if (repertory) {
    userToSubscribe = repertory.contacts.concat(repertory.invitationReceved, repertory.invitationSend, repertory.blackList);
  }

  return [
    Repertory.find({_id: repertoryId}),
    Meteor.users.find({_id: {$in: userToSubscribe}}),
    Teams.find({_id: {$in: repertory.teams}}),
  ];
});
