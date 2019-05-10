"use strict";
const rp = require('request-promise');
const _ = require('lodash');

const config = require("./config");
const { delegate, say, success } = require("./responses");
const jira = require("./jira");
//const ymonitor = require("./ymonitor");

module.exports.fullTextInterception = (body, callback) => {
 
  console.log(body);
  if (body.payload.text.match(/^echo\s+/)) {
    return callback(null, success(say(body.payload.text.replace(/^echo\s+/i, ""))));
  }
  else if (body.payload.text.match(/^alert status/)) {
  authenticate().then( token => {
     getAlertStatus(token).then( resp => {
        return callback(null, success(say("service " + resp['name'] + " is in " + resp['status'] + " status" )));

     }) 
    });
  }
  else if (body.payload.text.match(/^availability status/)) {
    authenticate().then( token => {
       getStatus(token).then( resp => {
          return callback(null, success(say("service " + "WB werk.nl " + " has " + resp['availabilityStatus'] + " availability status")));
  
       }) 
      });
    }
  else if (body.payload.text.match(/^ status/)) {
    authenticate().then( token => {
       getStatus(token).then( resp => {
          return callback(null, success(say("service " + "WB werk.nl " + " has " + resp['performanceStatus'] + " performance status")));
  
       }) 
      });
    }
        else if (body.payload.text.match(/^if i say imor/)) {
          authenticate().then( token => {
             getStatus(token).then( resp => {
                return callback(null, success(say("You say agent, YYYYMOR!  AGENT")));
        
             }) 
            });
          }
  else if (body.payload.text.match(/^henk/)) {
    authenticate().then( token => {
       getAlertStatus(token).then( resp => {
          return callback(null, success(say("service " + resp['name'] + " is in " + resp['status'] + " status" )));
  
       }) 
      });
    }
    else if (body.payload.text.match(/^piet/)) {
      authenticate().then( token => {
        allChains(token).then( resp => {
            return callback(null, success(say("service " + resp['name'] + " is in " + resp['status'] + " status" )));
    
         }) 
        });
      }
  

    
  else if (body.payload.text.match(/^apdex/)) {
    return callback(null, success(say("jullie hebben allemaal een onvoldoende!")));
  }
  //return callback(null, success(delegate()));
};

module.exports.preReport = (body, callback) => {
  


  callback(null, success(say(`Ladies, gentlemen and Rolf,

  Welcome to this beautiful freaky friday. My name is Ibox. It is my pleasure to show you a demo of the Ibox. 
  
  Before we start I have to say something. Although the other innovations I've seen today look pretty nice,           I'm still the best innovation of the day. Fuck you all! 
  
  So       , how do I work? Well, it's simple. I work out of the box, plug and play. A little power though might be useful. From that moment on, I listen to every customer. I answer questions about the status of your application landscape. I’m so smart. 
  
  I might look a little arrogant, but in fact I’m just very proud to be an extension of the Imonitor Platform. It’s the best. For this demo I will give you more information about the performance and availability of the coolest, smartest, biggest customer of Imor. 
  
  Are you ready? Try me. . . . 
  
  Imonitor Platform - APM Insights have never been more personal.`)));
};

module.exports.postReport = (body, callback) => {
  if (body.type === "validate") {
    return callback(null, success(say('Say yes to run the next custom action.', "Or click here")));
  }
  return callback(null, success(say(`Received confirmation for event ${body.event}.`)));
};

module.exports.postProblemDetail = (body, callback) => {
  if (
    config.JIRA_SERVER &&
    config.JIRA_USER &&
    config.JIRA_PASSWORD &&
    config.JIRA_ISSUE_TYPE &&
    config.JIRA_PROJECT
  ) {
    if (body.type === "validate") {
      const actions = [
        { name: "Assign to Dan", value: "Daniel.Dyla" },
        { name: "Assign to Mike", value: "Michael.Beemer" },
        { name: "Assign to Cory", value: "Cory.Woolf" },
      ];
      return callback(null, success(say("Would you like to assign a JIRA ticket?", null, actions)));
    }

    if (req.body.type === "custom") {
      return callback(null, success(say(`Assigned to: ${req.body.value}`)));
    }

    return jira.createTicket(
      body.payload.problem.title,
      body.payload.problem.url,
      (err, ticket) => {
        if (err) { return callback(err); }
        return callback(null, success(say(`Created ticket ${ticket.key} assigned to ${config.JIRA_USER}.`)));
      });
  }
  return callback(null, success(say("Add JIRA configuration parameters to 'config.json' to create a JIRA ticket.")));
};

module.exports.postEntityDetail = (body, callback) => {
  if (body.type === "validate") {
    return callback(null, success(say('Say yes to run the next custom action.', "Or click here")));
  }
  return callback(null, success(say(`Received confirmation for event ${body.event}.`)));
};

function authenticate(){
  var token = '';

 // const baseURL = this.config.getYmonitorUrl();

 // request token from Ymonitor API
 const opts = {
   method: 'POST',
   uri: 'https://www.ymonitor.nl/auth/realms/Ymonitor-production/protocol/openid-connect/token',
   headers: {
     'Content-Type': 'application/x-www-form-urlencoded',
     'Accept': 'application/json'
   },
   body: 
   "grant_type=password&username="+this.config.getYmonitorUsername()+"&password="+his.config.getYmonitorPassword()+"&client_id=ymonitor-frontend"
   ,
   json: false,
 }
console.log(JSON.stringify(opts)); 
 return rp(opts)
   .then(resp => {
    console.log(JSON.stringify(resp)); 
    token = JSON.parse(resp)['access_token'];
     console.log(token)
     return token;
   })
 .catch(function (err) {
   console.log('API call failed.'); 
   console.log("blbalbla"  + err.toString()); 
 })
};

function getAlertStatus(token) {
  
  const opts = {
    method: 'GET',
    uri: `https://api.ymonitor.nl/keten/18/alertstatus`,
    headers: {
      'Content-Type': 'application/json',
        'Authorization':  "Bearer " + token
              
         },
      json: true,
    }
    console.log(JSON.stringify(opts)); 
    return rp(opts)
      .then(resp => {    
        console.log("Got the following respond from Ymonitor: " + JSON.stringify(resp['status']));
        return resp;
      })
};

function getStatus(token) {
  
  const opts = {
    method: 'GET',
    uri: `https://api.ymonitor.nl/keten/18/perfavastatus`,
    headers: {
      'Content-Type': 'application/json',
        'Authorization':  "Bearer " + token
              
         },
      json: true,
    }
    console.log(JSON.stringify(opts)); 
    return rp(opts)
      .then(resp => {    
        console.log("Got the following respond from Ymonitor: " + JSON.stringify(resp['status']));
        return resp;
      })
};

function allChains(token) {
  const opts = {
    method: 'GET',
    uri: `https://api.ymonitor.nl/ketens`,
      headers: {
        'Content-Type': 'application/json',
        'Authorization':  "Bearer " + token
              
         },
      json: true,
    }
    return rp(opts)
      .then(resp => {    
        console.log("Got the following respond from Ymonitor: " + JSON.stringify(resp['keten']));
        return resp;
      })
}


