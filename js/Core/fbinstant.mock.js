
const FakeConnectedPlayer = function (fbID) {
	this.getPhoto = function () {
		return `https://graph.facebook.com/${fbID}/picture`
	}

	this.getName = function () {
		return `name_${fbID}`
	}

	this.getID = function () {
		return fbID
	}
}

const FakeLeaderboard = function () {
	this.setScoreAsync = function () {
		return new Promise((resolve, reject) => {
			setTimeout(_ => {
				resolve();
			}, 1000)
		})
	}, 
	this.getEntriesAsync = function(val1, val2) {
		return new Promise((resolve, reject) => {
			setTimeout(_ => {
				resolve(FAKE_LEADERBOARD_ENTRIES_DATA);
			}, 1000)
		})
	}
}

const FakeAdsInstant = function (testLoadSuccess, testShowSuccess) {
	this.loadAsync = function () {
		return new Promise((resolve, reject) => {
			setTimeout(() => {
				if (testLoadSuccess)
					resolve()
				else
					reject(new Error("test error load"))
			}
				, 500)
		})
	}

	this.showAsync = function () {
		return new Promise((resolve, reject) => {
			setTimeout(() => {
				if (testShowSuccess)
					resolve(this)
				else
					reject(new Error("test error show"))
			}
				, 500)
		})
	}
}

const ENTRY_POINT_DATA = {
	scores: {
		"100015099092655": 777,
		"100000049043753": 555,
		"1014603979": 333
	},
	infos: {
		"100015099092655": {
			name: "test01",
			avatar: `https://graph.facebook.com/100015099092655/picture`
		},
		"100000049043753": {
			name: "test02",
			avatar: `https://graph.facebook.com/100000049043753/picture`
		},
		"1014603979": {
			name: "test03",
			avatar: `https://graph.facebook.com/1014603979/picture`
		}
	},
	_v: 3
}

const FAKE_CONNECTED_USER_DATA = [
	new FakeConnectedPlayer("1014603979"),
	new FakeConnectedPlayer("100000049043753"),
	new FakeConnectedPlayer("100015099092655"),
]

const Leaderboard = function(entries) {
	this.getEntriesAsync = function(num1, num2) {
		return entries;
	}
}
const LeaderboardPlayer = function(photo, name, id) {
	this.getPhoto = function() {
		return photo;
	}
	this.getName =function() {
		return name;
	}
	this.getID = function() {
		return id;
	}
}

const LeaderboardEntry = function(score, rank, player) {
	this.getScore = function() {
		return score;
	}
	this.getRank = function() {
		return rank;
	} 
	this.getPlayer = function() {
		return player;
	}
}

const FAKE_PLAYER_DATA = [
	new LeaderboardPlayer(`https://graph.facebook.com/100000049043753/picture`, 'test02', "100000049043753"),
	new LeaderboardPlayer(`https://graph.facebook.com/100015099092655/picture`, 'test03', "100015099092655"),
	new LeaderboardPlayer(`https://graph.facebook.com/100015099092655/picture`, 'test04', "100015099092656"),
	new LeaderboardPlayer(`https://graph.facebook.com/100015099092655/picture`, 'test05', "100015099092657"),
	new LeaderboardPlayer(`https://graph.facebook.com/100015099092655/picture`, 'test06', "100015099092658"),
	new LeaderboardPlayer(`https://graph.facebook.com/1014603979/picture`, 'Tin Nguyen', "1014603979"),
]
const FAKE_LEADERBOARD_ENTRIES_DATA = [
	new LeaderboardEntry( 777, 1, FAKE_PLAYER_DATA[0]),
	new LeaderboardEntry( 555, 2, FAKE_PLAYER_DATA[1]),
	new LeaderboardEntry( 333, 3, FAKE_PLAYER_DATA[2]),
	new LeaderboardEntry( 222, 4, FAKE_PLAYER_DATA[3]),
	new LeaderboardEntry( 111, 5, FAKE_PLAYER_DATA[4]),
	new LeaderboardEntry( 12, 6, FAKE_PLAYER_DATA[5])
]
const FAKE_LEADERBOARD_DATA = new Leaderboard(FAKE_LEADERBOARD_ENTRIES_DATA);

export class FBInstantMockup {
	constructor(){}
	player = {
		getName: function () {
			return 'Tin Nguyen'
		},
		getPhoto: function () {
			return 'http://graph.facebook.com/1014603979/picture'
		},
		getID: function () {
			return 1014603979;
		},
		getDataAsync: function (keys) {
			return new Promise(function (resolve, reject) {
				console.log('(FBInstant::Mock)', 'player.getDataAsync');
				var playerData = localStorage.getItem('playerData');
				var response = {};
				if (playerData) {
					playerData = JSON.parse(playerData);
					keys.forEach(function (key) {
						if (playerData[key]) {
							response[key] = playerData[key];
						}
					})
				}
				resolve(response);
			});
		},
		setDataAsync: function (obj) {
			return new Promise(function (resolve, reject) {
				console.log('(FBInstant::Mock)', 'player.setDataAsync');
				var playerData = JSON.parse(localStorage.getItem('playerData')) || {};
				Object.keys(obj).forEach(function(key) {
					playerData[key] = obj[key];
				})
				localStorage.setItem('playerData', JSON.stringify(playerData));

				setTimeout(_ => {
					resolve();
				}, 2000);
			});
		},
		getConnectedPlayersAsync: function () {
			return new Promise((resolve, reject) => {
				setTimeout(_ => {
					resolve(FAKE_CONNECTED_USER_DATA);
				}, 1000)
			})
		},
		setStatsAsync: function () {
			return Promise.resolve(1);
			console.log('setStats Async call')
		},
	}
	context = {
		getID: function () {
			return 1234;
			// return null;
		},
		chooseAsync: function () {
			return new Promise(function (resolve, reject) {
				console.log('(FBInstant::Mock)', 'context.chooseAsync');
				FBInstant._createAlert('Choosing a new context', 'Play!', resolve);
			});

		},
		switchAsync: function (contextId) {
			// TODO: mock switchAsync
			console.log('TODO: mock switchAsync')
		},

		getType: function () {
			console.log('(FBInstant::Mock)', 'context.chooseAsync');
			return 'SOLO';
		}
	}
	getLocale = function () {
		return 'pt_BR';
	}
	initializeAsync = function () {
		return new Promise(function (resolve, reject) {
			console.log('(FBInstant::Mock)', 'initializeAsync');
			resolve();
		});
	}
	setLoadingProgress = function (progress) {
		return new Promise(function (resolve, reject) {
			console.log('(FBInstant::Mock)', 'progress', progress, '%');
			resolve();
		});
	}
	startGameAsync = function () {
		return new Promise(function (resolve, reject) {
			console.log('(FBInstant::Mock)', 'startGameAsync');
			//FBInstant._createAlert('Game is ready. Play now?', 'Play!', resolve);
			resolve();
		});
	}
	quit = function () {
		// TODO: mock quit
		console.log('TODO: mock quit')
	}

	updateAsync = function (config) {
		return new Promise(function (resolve, reject) {
			console.log('(FBInstant::Mock)', 'updateAsync');
			resolve();
		});

	}

	getInterstitialAdAsync = function (config) {
		return new Promise((resolve, reject) => {
			setTimeout(() => {
				resolve(new FakeAdsInstant(true, true))
				//reject(new Error("test interstitial error"));
			}, 500)
		})
	}

	getRewardedVideoAsync = function (config) {
		return new Promise((resolve, reject) => {
			setTimeout(() => {
				resolve(new FakeAdsInstant(true, true))
				//reject(new Error("test rewarded video error"));
			}, 0)
		})
	}

	getEntryPointData = function () {
		return ENTRY_POINT_DATA
	}

	setSessionData = function () {
		// TODO: mock setSessionData
		console.log('TODO: mock setSessionData')
	}
	logEvent = function ( name, val, params) {
		console.log("FBInstant tracked ");
	}
	_createAlert = function (message, btnMessage, callback) {
		var alertDiv = document.createElement('div');
		alertDiv.className = 'mockAlert';

		var title = document.createElement('h3');
		title.innerHTML = '(FBInstant Mock)'
		alertDiv.appendChild(title);

		var paragraph = document.createElement('p');
		paragraph.innerHTML = message;
		alertDiv.appendChild(paragraph);

		var button = document.createElement('input');
		button.type = 'button';
		button.value = btnMessage
		alertDiv.appendChild(button);

		button.onclick = function () {
			document.body.removeChild(alertDiv);
			callback();
		}

		document.body.appendChild(alertDiv);
	}

	getLeaderboardAsync = function (lbname) {
		return Promise.resolve(new FakeLeaderboard(lbname));
	}

	canCreateShortcutAsync() {
		return Promise.resolve(false);
	}
}