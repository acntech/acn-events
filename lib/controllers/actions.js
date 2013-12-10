var unregisterAct = {
  name: 'unregister',
  route: '/api/event/registrations/:id',
  httpVerb: 'delete',
  endState: 'unregistered',
//  selfUrl: function () {
//    return route;
//  },
  nextActions: [ ],
  isValidNextAction: function (name) {
    for (var i = 0; i < this.nextActions.length; i++) {
      if (this.nextActions[i].name === name) {
        return true;
      }
    }
    return false;
  },
//  resolveRoute: function (id) {
//    return this.route.replace(":id", id);
//  },
  links: function () {
    var linkArr =
    {
      self: this.route
    };

    for (var i = 0; i < this.nextActions.length; i++) {
      linkArr[this.nextActions[i].name] = this.nextActions[i].route;
    }

    return linkArr;
  }
};

var checkInAct = {
  name: 'checkIn',
  route: '/api/event/registrations/:id/checkin',
  httpVerb: 'post',
  endState: 'checkedIn',
//  selfUrl: function () {
//    return route;
//  },
  nextActions: [],
  isValidNextAction: function (name) {
    for (var i = 0; i < this.nextActions.length; i++) {
      if (this.nextActions[i].name === name) {
        return true;
      }
    }
    return false;
  },
//  resolveRoute: function (id) {
//    return this.route.replace(":id", id);
//  },
  links: function () {
    var linkArr =
    {
      self: this.route
    };

    for (var i = 0; i < this.nextActions.length; i++) {
      linkArr[this.nextActions[i].name] = this.nextActions[i].route;
    }

    return linkArr;
  }
};

var confirmAct = {
  name: 'confirm',
  route: '/api/event/registrations/:id/confirm',
  httpVerb: 'post',
  endState: 'confirmed',
//  selfUrl: function () {
//    return route;
//  },
  nextActions: [ unregisterAct, checkInAct ],
  isValidNextAction: function (name) {
    for (var i = 0; i < this.nextActions.length; i++) {
      if (this.nextActions[i].name === name) {
        return true;
      }
    }
    return false;
  },
//  resolveRoute: function (id) {
//    return this.route.replace(":id", id);
//  },
  links: function () {
    var linkArr =
    {
      self: this.route  
    };

    for (var i = 0; i < this.nextActions.length; i++) {
      linkArr[this.nextActions[i].name] = this.nextActions[i].route;
    }

    return linkArr;
  }
};

var registerAct = {
  name: 'register',
  route: '/api/event/registrations',
  httpVerb: 'post',
  endState: 'registered',
  links: function () {
    var linkArr =
    {
      self: this.route
    };

    for (var i = 0; i < this.nextActions.length; i++) {
      linkArr[this.nextActions[i].name] = this.nextActions[i].route;
    }

    return linkArr;
  },
  nextActions: [ unregisterAct, confirmAct ],
  isValidNextAction: function (name) {
    for (var i = 0; i < this.nextActions.length; i++) {
      if (this.nextActions[i].name === name) {
        return true;
      }
    }
    return false;
  }
};

var actions = {
  register: registerAct,
  unregister: unregisterAct,
  confirm: confirmAct,
  checkIn: checkInAct,
  isValidNextAction: function (state, actionName) {
    switch (state) {
      case this.register.endState:
        return this.register.isValidNextAction(actionName);
        break;
      case this.unregister.endState:
        return this.unregister.isValidNextAction(actionName);
        break;
      case this.confirm.endState:
        return this.confirm.isValidNextAction(actionName);
        break;
      case this.checkIn.endState:
        return this.checkIn.isValidNextAction(actionName);
        break;
      default:
        return false;
    }
  }
};

module.exports = actions;

