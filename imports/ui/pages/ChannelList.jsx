import React               from 'react'

import List                from '../components/List.jsx';
import AppNav              from '../components/AppNav.jsx';
import Breadcrumb          from '../components/Breadcrumb.jsx';

export default class ChannelList extends React.Component {

  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    const userInvited = this.refs.userInvited.value;

    if (userInvited) {
      Meteor.call('channels.conversationCreate', userInvited);
      this.refs.userInvited.value = '';
    }
  }

  render() {
    const {
      channels,
      conversations,
      user,
      unreadCounts
    } = this.props;

    const sortedChannels = channels.sort((a, b) => {
      return b.lastActivity - a.lastActivity;
    });
    // const sortedConversations = conversations.sort((a, b) => {
    //   return b.lastActivity - a.lastActivity;
    // });

    return (
      <div className="screen-box">
        <Breadcrumb title="Récent" hasBack={false} />
          <div className="sub-container">
            <List data={sortedChannels} type="channel" unreadCounts={unreadCounts} />
          </div>
        <AppNav user={user}/>
      </div>
    );
  }
}
