import React, { Component } from 'react';

const styles = {

};
class AddHunter extends Component {

	constructor(props) {
    super(props);
		this.state = {
      open: false,
    };
  }

	render() {

		const { 
			userAppState, 
			toggleAppSettingsMenu, 
			toggleMapPoints, 
			toggleEntityLabels, 
			toggleMapLines, 
			toggleMapPolygons,
			toggleMapboxServer,
			showMapOverlay, 
			user, 
			logOut,
			toggleMapFeeds, 
		} = this.props;

		return (
			<div style={{
				height: 48
			}}>
				<AppBar
					style={{
						height: 48,
						lineHeight: "48px",
						backgroundColor: '#41454a',
						position: 'relative',
    					zIndex: 600,
						paddingRight: 6
					}}
					iconStyleLeft={{
						marginTop: 0
					}}
					iconStyleRight={{
						margin: 0
					}}
					titleStyle={{
						lineHeight: "48px",
						fontSize: '20px'
					}}
					title="Map"
					iconElementLeft={
						<IconButton onClick={() => toggleAppSettingsMenu()}>
							<NavigationMenu />
						</IconButton>}
					iconElementRight={
						<div className='appBarWrapperRight'>
							<AlertSidebar map={this.props.map}/>
							<AppMenu 
								user={user.profile}
								isHydrated={user.isHydrated}
								logOut={logOut}/>
						</div>
					}
				/>
			
				<Drawer
					className='options-drawer'
					docked={false}
					width={300}
					open={userAppState.appSettingsOpen}
					containerStyle={{backgroundColor: '#1F1F21'}}
					onRequestChange={() => toggleAppSettingsMenu()}
					overlayStyle={{background: 'linear-gradient(to right, rgba(0,0,0,0.85) 20%, rgba(0,0,0,0) 95%)'}}
				>
					
						<List
							style={{ paddingBottom: '1rem' }}
						>
							<Subheader className='subheader'>BASE MAP</Subheader>
							
							<TileOptions 
								{...this.props}
							/>
						</List>

						<Divider
							style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
						/>

						<List>
							<ListItem
								className={`option-label ${(userAppState.showEntityLabels ? 'toggle-on' : 'toggle-off')}`} 
								primaryText="Map Labels"
								// secondaryText={
									// <p>Displays entity names with the map objects.</p>}
								rightToggle={
									<Toggle			
										thumbStyle={styles.thumbOff}
										trackStyle={styles.trackOff}
										thumbSwitchedStyle={styles.thumbSwitched}
										trackSwitchedStyle={styles.trackSwitched}
										toggled={userAppState.showEntityLabels}
										onClick={() => toggleEntityLabels(userAppState.showEntityLabels)}
									/>}
								secondaryTextLines={2} />
						</List>

						<Divider
							style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
						/>

						<List>
							<Subheader className='subheader'>MAP OVERLAYS</Subheader>
							<ListItem
								className={`option-label ${(userAppState.showOverlayTopographical ? 'toggle-on' : 'toggle-off')}`}
								primaryText="Nautical Charts"
								rightToggle={
									<Toggle			
										thumbStyle={styles.thumbOff}
										trackStyle={styles.trackOff}
										thumbSwitchedStyle={styles.thumbSwitched}
										trackSwitchedStyle={styles.trackSwitched}
										toggled={userAppState.showOverlayTopographical}
										onClick={() => showMapOverlay('Topographic', userAppState.showOverlayTopographical)}
									/>}
							/>
							<ListItem
								className={`option-label ${(userAppState.showOverlayRoads ? 'toggle-on' : 'toggle-off')}`} 
								primaryText="Roads and Labels"
								rightToggle={
									<Toggle			
										thumbStyle={styles.thumbOff}
										trackStyle={styles.trackOff}
										thumbSwitchedStyle={styles.thumbSwitched}
										trackSwitchedStyle={styles.trackSwitched}
										toggled={userAppState.showOverlayRoads}
										onClick={() => showMapOverlay('Roads', userAppState.showOverlayRoads)}
									/>}
							/>
							<ListItem
								className={`option-label ${(userAppState.showOverlayClouds ? 'toggle-on' : 'toggle-off')}`} 
								primaryText="Clouds"
								rightToggle={
									<Toggle			
										thumbStyle={styles.thumbOff}
										trackStyle={styles.trackOff}
										thumbSwitchedStyle={styles.thumbSwitched}
										trackSwitchedStyle={styles.trackSwitched}
										toggled={userAppState.showOverlayClouds}
										onClick={() => showMapOverlay('Clouds', userAppState.showOverlayClouds)}
									/>}
							/>
							<ListItem
								className={`option-label ${(userAppState.showOverlayPressure ? 'toggle-on' : 'toggle-off')}`} 
								primaryText="Pressure"
								rightToggle={
									<Toggle			
										thumbStyle={styles.thumbOff}
										trackStyle={styles.trackOff}
										thumbSwitchedStyle={styles.thumbSwitched}
										trackSwitchedStyle={styles.trackSwitched}
										toggled={userAppState.showOverlayPressure}
										onClick={() => showMapOverlay('Pressure', userAppState.showOverlayPressure)}
									/>}
							/>
							<ListItem
								className={`option-label ${(userAppState.showOverlayWind ? 'toggle-on' : 'toggle-off')}`} 
								primaryText="Wind"
								rightToggle={
									<Toggle			
										thumbStyle={styles.thumbOff}
										trackStyle={styles.trackOff}
										thumbSwitchedStyle={styles.thumbSwitched}
										trackSwitchedStyle={styles.trackSwitched}
										toggled={userAppState.showOverlayWind}
										onClick={() => showMapOverlay('Wind', userAppState.showOverlayWind)}
									/>}
							/>
						</List>

						<Divider
							style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
						/>
							
						<List>
							<Subheader className='subheader'>FEEDS</Subheader>

							{userAppState.userFeeds.filter((feed) => {
								return feed !== 'shapes' && feed.config.canView === true
							}).map((feed) => {
									return <ListItem
										key={feed.feedId}
										className={`option-label ${(!userAppState.disabledFeeds.includes(feed.feedId) ? 'toggle-on' : 'toggle-off')}`} 
										primaryText={feed.name}
										rightToggle={
											<Toggle			
												thumbStyle={styles.thumbOff}
												trackStyle={styles.trackOff}
												thumbSwitchedStyle={styles.thumbSwitched}
												trackSwitchedStyle={styles.trackSwitched}
												toggled={!userAppState.disabledFeeds.includes(feed.feedId)}
												onClick={() => toggleMapFeeds(feed.feedId)}
											/>}
									/>
								})
							}

							{/*<ListItem
								className={`option-label ${(userAppState.mapPrefsShowTracks ? 'toggle-on' : 'toggle-off')}`} 
								primaryText="Tracks"
								rightToggle={
									<Toggle			
										thumbStyle={styles.thumbOff}
										trackStyle={styles.trackOff}
										thumbSwitchedStyle={styles.thumbSwitched}
										trackSwitchedStyle={styles.trackSwitched}
										toggled={userAppState.mapPrefsShowTracks}
										onClick={() => toggleMapTracks(userAppState.mapPrefsShowTracks)}
									/>}
							/>*/}
							<ListItem
								className={`option-label ${(userAppState.mapPrefsShowPoints ? 'toggle-on' : 'toggle-off')}`}
								primaryText="Points"
								rightToggle={
									<Toggle			
										thumbStyle={styles.thumbOff}
										trackStyle={styles.trackOff}
										thumbSwitchedStyle={styles.thumbSwitched}
										trackSwitchedStyle={styles.trackSwitched}
										toggled={userAppState.mapPrefsShowPoints}
										onClick={() => toggleMapPoints(userAppState.mapPrefsShowPoints)}
									/>}
							/>
							<ListItem
								className={`option-label ${(userAppState.mapPrefsShowPolygons ? 'toggle-on' : 'toggle-off')}`} 
								primaryText="Polygons"
								rightToggle={
									<Toggle			
										thumbStyle={styles.thumbOff}
										trackStyle={styles.trackOff}
										thumbSwitchedStyle={styles.thumbSwitched}
										trackSwitchedStyle={styles.trackSwitched}
										toggled={userAppState.mapPrefsShowPolygons}
										onClick={() => toggleMapPolygons(userAppState.mapPrefsShowPolygons)}
									/>}
							/>
							<ListItem
								className={`option-label ${(userAppState.mapPrefsShowLines ? 'toggle-on' : 'toggle-off')}`} 
								primaryText="Lines"
								rightToggle={
									<Toggle			
										thumbStyle={styles.thumbOff}
										trackStyle={styles.trackOff}
										thumbSwitchedStyle={styles.thumbSwitched}
										trackSwitchedStyle={styles.trackSwitched}
										toggled={userAppState.mapPrefsShowLines}
										onClick={() => toggleMapLines(userAppState.mapPrefsShowLines)}
									/>}
							/>
							
						</List>

						<Divider
							style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
						/>

						<List>
							<Subheader className='subheader'>MAPBOX</Subheader>
							<ListItem
								className={`option-label ${(userAppState.useMapbox ? 'toggle-on' : 'toggle-off')}`}
								primaryText="Use Mapbox maps"
								rightToggle={
									<Toggle	
										// disabled={true}		/* disabled until dmz ready */
										thumbStyle={styles.thumbOff}
										trackStyle={styles.trackOff}
										thumbSwitchedStyle={styles.thumbSwitched}
										trackSwitchedStyle={styles.trackSwitched}
										toggled={userAppState.useMapbox}
										onClick={() => toggleMapboxServer(userAppState.useMapbox)}
									/>
								}
							/>
						</List>
				
				</Drawer>
			</div>
		)
	}
}

export default AddHunter;