/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

Components.utils.import("resource:///modules/imXPCOMUtils.jsm");
Components.utils.import("resource:///modules/jsProtoHelper.jsm");

Components.utils.import("resource://components/mtproto.jsm");
Components.utils.import("resource://components/controller.jsm");

//MtpNetworkerFactory.startAll();
//sendCode();

function Conversation(aAccount)
{
  this._init(aAccount);
}
Conversation.prototype = {
  __proto__: GenericConvIMPrototype,
  _disconnected: false,
  _setDisconnected: function() {
    this._disconnected = true;
  },
  close: function() {
    if (!this._disconnected)
      this.account.disconnect(true);
  },
  sendMsg: function (aMsg) {
    if (this._disconnected) {
      this.writeMessage("telegram", "This message could not be sent because the conversation is no longer active: " + aMsg, {system: true, error: true});
      return;
    }

    this.writeMessage("You", aMsg, {outgoing: true});
    this.writeMessage("/dev/null", "Echo: "+aMsg,
                      {incoming: true, autoResponse: false}); //true
  },

  get name() { return "/dev/null"; },
};

function Account(aProtoInstance, aImAccount)
{
  this._init(aProtoInstance, aImAccount);
}
Account.prototype = {
  __proto__: GenericAccountPrototype,
  connect: function() {
    this.reportConnecting();
    // do something here

    //sendCode();

    this.reportConnected();
    setTimeout((function() {
      this._conv = new Conversation(this);
      this._conv.writeMessage("telegram", "You are now talking to /dev/null", {system: true});

      this._conv.writeMessage("telegram", "asdf", {system: true});
    }).bind(this), 0);
  },
  _conv: null,
  dialog_list: null,
  disconnect: function(aSilent) {
    this.reportDisconnecting(Components.interfaces.prplIAccount.NO_ERROR, "");
    if (!aSilent)
      this._conv.writeMessage("telegram", "You have disconnected.", {system: true});
    /*if (this._conv) {
      this._conv._setDisconnected();
      delete this._conv;
    }*/
    this.reportDisconnected();
  },

  get canJoinChat() { return false; }
};

function telegram() { }
telegram.prototype = {
  __proto__: GenericProtocolPrototype,
  get name() { return "Telegram"; },
  get iconBaseURI() "chrome://telegram/content/",
  get noPassword() true,
  options: {
    "text": {label: "Text option",    default: "foo"},
    "bool": {label: "Boolean option", default: true},
    "int" : {label: "Integer option", default: 42},
    "list": {label: "Select option",  default: "option2",
             listValues: {"option1": "First option",
                          "option2": "Default option",
                          "option3": "Other option"}}
  },
  usernameSplits: [
    {label: "Number", separator: "@", defaultValue: "+491234567890",
     reverse: true}
  ],
  getAccount: function(aImAccount) { return new Account(this, aImAccount); },
  classID: Components.ID("{03618410-7a46-11e5-a837-0800200c9a66}"),
};

var NSGetFactory = XPCOMUtils.generateNSGetFactory([telegram]);
