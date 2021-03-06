/*©*****************************************************************************
*                                                                              *
* Friend Unifying Platform                                                     *
* ------------------------                                                     *
*                                                                              * 
* Copyright 2014-2016 Friend Software Labs AS, all rights reserved.            *
* Hillevaagsveien 14, 4016 Stavanger, Norway                                   *
* Tel.: (+47) 40 72 96 56                                                      *
* Mail: info@friendos.com                                                      *
*                                                                              *
*****************************************************************************©*/

/* Simple example program for templates and windows */


// This is the main run function for jsx files and FriendUP js apps
Application.run = function( msg )
{
	// Make a new window with some flags
	this.mainView = new View( 
	{
		title: i18n('i18n_title'),
		width: 1100,
		height: 900
	} );

	// Displays the 'About' option in the menu
	this.drawMenu();
	
	// Load a file from the same dir as the jsx file is located
	var self = this;
	var f = new File( 'Progdir:Templates/index.html' );
	f.onLoad = function( data )
	{
		// Set it as window content
		self.mainView.setContent( data );
	}
	f.load();
	
	// On closing the window, quit.
	this.mainView.onClose = function()
	{
		Application.quit();
	}
};

// Redraws the main application pulldown menu
Application.drawMenu = function()
{
	this.mainView.setMenuItems( 
	[
		{
			name: i18n( 'i18n_file' ),
			items: 
			[
				{
					name: i18n( 'i18n_about' ),
					command: 'about'
				}
			]
		}
	] );
};

// Message handling
Application.receiveMessage = function( msg )
{
	switch( msg.command )
	{
	case 'about':
		this.about();
		break;
	}
};

// About box
Application.about = function()
{
	if( this.aboutWindow ) 
		return;
	this.aboutWindow = new View( 
	{
		title: i18n( 'i18n_about0' ),
		width: 400,
		height: 300
	} );
	var v = this.aboutWindow;
	this.aboutWindow.onClose = function()
	{
		Application.aboutWindow = false;
	}
	var f = new File( 'Progdir:Templates/about.html' );
	f.i18n();
	
	var self = this;
	f.onLoad = function( data )
	{
		self.aboutWindow.setContent( data );
	}
	f.load();
};
