/* ***** BEGIN LICENSE BLOCK *****
 * Version: MPL 1.1/GPL 2.0/LGPL 2.1
 *
 * The contents of this file are subject to the Mozilla Public License Version
 * 1.1 (the "License"); you may not use this file except in compliance with
 * the License. You may obtain a copy of the License at
 * http://www.mozilla.org/MPL/
 *
 * Software distributed under the License is distributed on an "AS IS" basis,
 * WITHOUT WARRANTY OF ANY KIND, either express or implied. See the License
 * for the specific language governing rights and limitations under the
 * License.
 *
 * The Original Code is MozRepl.
 *
 * The Initial Developer of the Original Code is
 * Massimiliano Mirra <bard [at] hyperstruct [dot] net>.
 * Portions created by the Initial Developer are Copyright (C) 2006-2008
 * the Initial Developer. All Rights Reserved.
 *
 * Contributor(s):
 *   Massimiliano Mirra <bard [at] hyperstruct [dot] net>
 *
 * Alternatively, the contents of this file may be used under the terms of
 * either the GNU General Public License Version 2 or later (the "GPL"), or
 * the GNU Lesser General Public License Version 2.1 or later (the "LGPL"),
 * in which case the provisions of the GPL or the LGPL are applicable instead
 * of those above. If you wish to allow use of your version of this file only
 * under the terms of either the GPL or the LGPL, and not to allow others to
 * use your version of this file under the terms of the MPL, indicate your
 * decision by deleting the provisions above and replace them with the notice
 * and other provisions required by the GPL or the LGPL. If you do not delete
 * the provisions above, a recipient may use your version of this file under
 * the terms of any one of the MPL, the GPL or the LGPL.
 *
 * ***** END LICENSE BLOCK ***** */

window.addEventListener(
  // TRANSITION MOZLAB -> MOZREPL
    'load', function(event) { 
      var Cc = Components.classes;
      var Ci = Components.interfaces;

      var appInfo = Cc["@mozilla.org/xre/app-info;1"].
        getService(Ci.nsIXULAppInfo);
      var extmgr = Cc["@mozilla.org/extensions/manager;1"].
        getService(Ci.nsIExtensionManager);
      var pref = Cc['@mozilla.org/preferences-service;1'].
        getService(Ci.nsIPrefService).
        getBranch('extensions.mozlab.');

      var open_url = null;

      function urlconv(spec) {
        var ios = Cc["@mozilla.org/network/io-service;1"].
          getService(Ci.nsIIOService);
        return ios.newURI(spec, null, null);
      }


      // FIREFOX
      if (appInfo.ID === "{ec8030f7-c20a-464f-9b0e-13a3a9e97384}") {
        open_url = function(url, name) {
          return Application.activeWindow.open(urlconv(url));
        }
      } // OTHER XULRUNNER APPS
      else {
        open_url = function(url, name) {
          return window.open(url, name, "chrome=yes");
        }
      }

  
      if(extmgr.getItemForID("mozrepl@hyperstruct.net") && pref.getBoolPref("firstrun")) {
        // AUTO-UNINSTALL MOZLAB: extmgr.uninstallItem("mozlab@hyperstruct.net");
        handle = open_url("chrome://mozlab/content/mozrepl/mozrepl-installed.xul", 
                          "mozrepl_install");
        handle.focus();
        pref.setBoolPref("firstrun", false);
      }
      else if (pref.getBoolPref("firstrun")) {
        handle = open_url("chrome://mozlab/content/mozrepl/mozrepl-install.xul", 
                          "mozrepl_install");
        handle.focus();
      }    
    }, false);


