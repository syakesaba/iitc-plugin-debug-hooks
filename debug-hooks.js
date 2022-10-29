// ==UserScript==
// @author         syakesaba
// @name           IITC plugin: debug-hooks
// @category       Debug
// @version        0.0.1
// @description    Debug for you all.
// @id             debug-hooks
// @namespace      https://github.com/IITC-CE/ingress-intel-total-conversion
// @updateURL      https://raw.githubusercontent.com/syakesaba/iitc-plugin-debug-hooks/develop/debug-hooks.js
// @downloadURL    https://raw.githubusercontent.com/syakesaba/iitc-plugin-debug-hooks/develop/debug-hooks.js
// @match          https://intel.ingress.com/*
// @grant          none
// ==/UserScript==

function wrapper(plugin_info) {
// ensure plugin framework is there, even if iitc is not yet loaded
if(typeof window.plugin !== 'function') window.plugin = function() {};

//PLUGIN AUTHORS: writing a plugin outside of the IITC build environment? if so, delete these lines!!
//(leaving them in place might break the 'About IITC' page or break update checks)
plugin_info.buildName = 'release';
plugin_info.dateTimeVersion = '2022-10-29-210000';
plugin_info.pluginId = 'debug-hooks';
//END PLUGIN AUTHORS NOTE

// use own namespace for plugin
window.plugin.debughooks = function() {};

//--------------------------SCRIPT BEGIN

window.plugin.debughooks.logging = function() {
   console.log(arguments);
   console.log(arguments.callee);
}

window.plugin.debughooks.main = function() {
    /*
    //https://github.com/IITC-CE/ingress-intel-total-conversion/blob/master/core/code/hooks.js
    addHook('portalSelected', window.plugin.debughooks.logging);
// portalSelected: called when portal on map is selected/unselected.
//              Provide guid of selected and unselected portal.
    addHook('mapDataRefreshStart', window.plugin.debughooks.logging);
// mapDataRefreshStart: called when we start refreshing map data
    addHook('mapDataEntityInject', window.plugin.debughooks.logging);
// mapDataEntityInject: called just as we start to render data. has callback to
//                      Sinject cached entities into the map render
    addHook('mapDataRefreshEnd', window.plugin.debughooks.logging);
// mapDataRefreshEnd: called when we complete the map data load
    addHook('portalAdded', window.plugin.debughooks.logging);
// portalAdded: called when a portal has been received and is about to
//              be added to its layer group. Note that this does NOT
//              mean it is already visible or will be, shortly after.
//              If a portal is added to a hidden layer it may never be
//              shown at all. Injection point is in
//              code/map_data.js#renderPortal near the end. Will hand
//              the Leaflet CircleMarker for the portal in "portal" var.
    addHook('linkAdded', window.plugin.debughooks.logging);
// linkAdded:   called when a link is about to be added to the map
    addHook('fieldAdded', window.plugin.debughooks.logging);
// fieldAdded:  called when a field is about to be added to the map
    addHook('portalRemoved', window.plugin.debughooks.logging);
// portalRemoved: called when a portal has been removed
    addHook('linkRemoved', window.plugin.debughooks.logging);
// linkRemoved: called when a link has been removed
    addHook('fieldRemoved', window.plugin.debughooks.logging);
// fieldRemoved: called when a field has been removed
    addHook('portalDetailsUpdated', window.plugin.debughooks.logging);
// portalDetailsUpdated: fired after the details in the sidebar have
//              been (re-)rendered Provides data about the portal that
//              has been selected.
    addHook('publicChatDataAvailable', window.plugin.debughooks.logging);
// publicChatDataAvailable: this hook runs after data for any of the
//              public chats has been received and processed, but not
//              yet been displayed. The data hash contains both the un-
//              processed raw ajax response as well as the processed
//              chat data that is going to be used for display.
    addHook('factionChatDataAvailable', window.plugin.debughooks.logging);
// factionChatDataAvailable: this hook runs after data for the faction
//              chat has been received and processed, but not yet been
//              displayed. The data hash contains both the unprocessed
//              raw ajax response as well as the processed chat data
//              that is going to be used for display.
    addHook('alertsChatDataAvailable', window.plugin.debughooks.logging);
// alertsChatDataAvailable: this hook runs after data for the alerts
//              chat has been received and processed, but not yet been
//              displayed. The data hash contains both the unprocessed
//              raw ajax response as well as the processed chat data
//              that is going to be used for display.
    //addHook('requestFinished', window.plugin.debughooks.logging);
// requestFinished: DEPRECATED: best to use mapDataRefreshEnd instead
//              called after each map data request finished. Argument is
//              {success: boolean} indicated the request success or fail.
    addHook('iitcLoaded', window.plugin.debughooks.logging);
// iitcLoaded: called after IITC and all plugins loaded
*/
    addHook('portalDetailLoaded', window.plugin.debughooks.logging);
/*
// portalDetailLoaded: called when a request to load full portal detail
//              completes. guid, success, details parameters
    addHook('paneChanged', window.plugin.debughooks.logging);
// paneChanged  called when the current pane has changed. On desktop,
//              this only selects the current chat pane; on mobile, it
//              also switches between map, info and other panes defined
//              by plugins
    addHook('artifactsUpdated', window.plugin.debughooks.logging);
// artifactsUpdated: called when the set of artifacts (including targets)
//              has changed. Parameters names are old, new.
    addHook('nicknameClicked', window.plugin.debughooks.logging);
// nicknameClicked:
    addHook('geoSearch', window.plugin.debughooks.logging);
// geoSearch:
    addHook('search', window.plugin.debughooks.logging);
// search:
*/
}

var setup = function () {
  window.plugin.debughooks.main();
}

//---------------------------SCRIPT END

setup.info = plugin_info; //add the script info data to the function as a property
if(!window.bootPlugins) window.bootPlugins = [];
window.bootPlugins.push(setup);
// if IITC has already booted, immediately run the 'setup' function
if(window.iitcLoaded && typeof setup === 'function') setup();
} // wrapper end
// inject code into site context
var script = document.createElement('script');
var info = {};
if (typeof GM_info !== 'undefined' && GM_info && GM_info.script) info.script = { version: GM_info.script.version, name: GM_info.script.name, description: GM_info.script.description };
script.appendChild(document.createTextNode('('+ wrapper +')('+JSON.stringify(info)+');'));
(document.body || document.head || document.documentElement).appendChild(script);

