const uuid = require('uuid');
const MAX_SPEED = 5;
const MIN_SPEED = 2;
const MAX_SCORE = 10;
const {Howl, Howler} = require('howler');
var sound4 = new Howl({
	src: ['boing.mp3']
});
//var audio_ahh_mult = new Audio("https://raw.githubusercontent.com/benjamin-zimmerman/multiplayer-pong/dev/ahhh.mp3");

class Game {
	constructor(id, username, id2, username2) {
		this.ball_vel = 0.5;
		this.id = uuid.v4();
		this.player1 = id;
		this.player2 = id2;
		this.players = {};
		this.players[id] = { name: username.toString(), pos: 50, score: 0 };
		this.players[id2] = { name: username.toString(), pos: 50, score: 0 };
		this.ball = [20, 50];
		this.ball_velocity = [MIN_SPEED, 0];
		//this.sound3 = new Audio(audio_boing_mult);
		this.sound = {}; 
		
	}

	//Updates game_state and calculates ball position and velocity
	update() {
		this.ball[0] += this.ball_velocity[0];
		this.ball[1] += this.ball_velocity[1];
		if (this.ball[0] >= 100) {
			this.players[this.player1].score++;
			this.reset(1);

		} else if (this.ball[0] <= 0) {
			this.players[this.player2].score++;
			this.reset(2);
			this.sound = sound4.play();
			//this.sound4.seek(0);
			//this.sound4.play();
			//this.sound4.pause();
			//this.sound4.currentTime = 0;
			//this.sound4.play();
		}

		if (this.ball[1] >= 100) {
			this.ball_velocity[1] *= -1;
			this.ball[1] = 99;
		} else if (this.ball[1] <= 0) {
			this.ball_velocity[1] *= -1;
			this.ball[1] = 1;
		}

		//Ugly conditionals, but eh not familiar with javascript syntactically and it works
		if (
			this.ball[1] < this.players[this.player2].pos + 10 &&
			this.ball[1] + 2 > this.players[this.player2].pos - 10 &&
			this.ball[0] > 94 &&
			this.ball[0] < 98
		) {
			this.ball[0] = 94;
			var relativeIntersectY =
				this.players[this.player2].pos - this.ball[1] - 1;
			var normalizedRelativeIntersectionY = relativeIntersectY / 10;
			this.ball_velocity[0] = -(
				(1 - Math.abs(normalizedRelativeIntersectionY)) *
					(MAX_SPEED - MIN_SPEED) +
				MIN_SPEED
			);
			this.ball_velocity[1] = -normalizedRelativeIntersectionY;
			//this.sound3.pause();
			//this.sound3.currentTime = 0;
			//this.sound3.play();
			

		} else if (
			this.ball[1] < this.players[this.player1].pos + 10 &&
			this.ball[1] + 2 > this.players[this.player1].pos - 10 &&
			this.ball[0] < 6 &&
			this.ball[0] > 2
		) {
			this.ball[0] = 6;
			var relativeIntersectY =
				this.players[this.player1].pos - this.ball[1] - 1;
			var normalizedRelativeIntersectionY = relativeIntersectY / 10;
			var normalizedRelativeIntersectionY = relativeIntersectY / 10;
			this.ball_velocity[0] =
				(1 - Math.abs(normalizedRelativeIntersectionY)) *
					(MAX_SPEED - MIN_SPEED) +
				MIN_SPEED;
			this.ball_velocity[1] = -normalizedRelativeIntersectionY;
			//this.sound3.pause();
			//this.sound3.currentTime = 0;
			//this.sound3.play();
			
		}
	}

	reset(player) {
		if (player == 1) {
			this.ball = [60, 50];
			this.ball_velocity = [-(MIN_SPEED - 1), 0];
		} else {
			this.ball = [40, 50];
			this.ball_velocity = [MIN_SPEED - 1, 0];
		}
	}
}

module.exports = Game;
