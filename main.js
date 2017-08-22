/*#########################################################################
#                                                                         #
#   Simple script shamelessly recopied from Cool Streams                  #
#                                                                         #
#   Copyright                                                             #
#   (C) 2007, 2008 Nikolaj Hald Nielsen  <nhnFreespirit@gmail.com>        #
#   (C)       2008 Peter ZHOU <peterzhoulei@gmail.com>                    #
#   (C)       2008 Mark Kretschmann <kretschmann@kde.org>                 #
#   (C)       2008 Georges Dubus <georges.dubus@supelec.fr>               #
#                                                                         #
#   This program is free software; you can redistribute it and/or modify  #
#   it under the terms of the GNU General Public License as published by  #
#   the Free Software Foundation; either version 2 of the License, or     #
#   (at your option) any later version.                                   #
#                                                                         #
#   This program is distributed in the hope that it will be useful,       #
#   but WITHOUT ANY WARRANTY; without even the implied warranty of        #
#   MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the         #
#   GNU General Public License for more details.                          #
#                                                                         #
#   You should have received a copy of the GNU General Public License     #
#   along with this program; if not, write to the                         #
#   Free Software Foundation, Inc.,                                       #
#   51 Franklin Street, Fifth Floor, Boston, MA  02110-1301, USA.         #
##########################################################################*/

Importer.loadQtBinding("qt.core");
Importer.loadQtBinding("qt.gui");

function Station( name, url )
{
    this.name = name;
    this.url = url;
}

var stationArray = new Array (
new Station( "DE Continuum's relay 192 mp3",    "http://privat.is-by.us:8000/necta192.mp3" ),
new Station( "DE stream (High Bitrate)",    "http://nectarine.from-de.com/necta192" ),
new Station( "NO stream",    "http://pmaster.no:9000/necta" ),
new Station( "UK stream (High bitrate)",    "http://necta.pedroja.tech/necta192.mp3" ),
new Station( "US Stream",    "http://nectarine.ers35.net:8000/necta192.mp3" )
);

function Nectarine()
{
    ScriptableServiceScript.call( this, "Nectarine Demoscene Radio", 1, "A list of streams of nectarine demoscene radio. Remember to connect to a stream close to your location.", "", false );
}

function onConfigure()
{
    Amarok.alert( "This script does not require any configuration." );
}

function onPopulating( level, callbackData, filter )
{
    Amarok.debug( " Populating station level..." );
    //add the station streams as leaf nodes
    for ( i = 0; i < stationArray.length; i++ )
    {
        item = Amarok.StreamItem;
        item.level = 0;
        item.callbackData = "";
        item.itemName = stationArray[i].name;
        item.playableUrl = stationArray[i].url;
        item.infoHtml = "A nectarine stream called " + item.itemName;
        script.insertItem( item );
    }
    script.donePopulating();
}

function onCustomize() {
  Amarok.debug ( "loading icon: " + Amarok.Info.scriptPath() + "/icon.png" );
  var icon = new QPixmap( Amarok.Info.scriptPath() + "/icon.png" );
  script.setIcon( icon );
  Amarok.debug ( "on customize: OK" );
}

Amarok.configured.connect( onConfigure );

script = new Nectarine();
script.populate.connect( onPopulating );
script.customize.connect( onCustomize );

