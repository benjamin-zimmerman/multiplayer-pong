const MAX_SPEED = 1.5;
const MIN_SPEED = 1;
const MAX_SCORE = 10;
//const boingSOUND = document.getElementbyID("boing");

class Game {
	constructor(id, username, id2, username2) {
		this.ball_vel = 0.5;
		this.player1 = id;
		this.player2 = id2;
		this.players = {};
		this.players[id] = { name: username.toString(), pos: 50, score: 0 };
		this.players[id2] = { name: username.toString(), pos: 50, score: 0 };
		this.ball = [20, 50];
		this.ball_velocity = [MIN_SPEED, 0];
	}

	//Updates game_state and calculates ball position and velocity
	
	update() {
		//First consider cases where nothing needs to change
		this.ball[0] += this.ball_velocity[0];
		this.ball[1] += this.ball_velocity[1];
		
		//Consider cases where a player scores
		if (this.ball[0] >= 100) {
			this.players[this.player1].score++;
			this.reset(1);
		} else if (this.ball[0] <= 0) {
			this.players[this.player2].score++;
			this.reset(2);
		}

		if (this.ball[1] >= 100) {
			this.ball_velocity[1] *= -1;
			this.ball[1] = 99;
		} else if (this.ball[1] <= 0) {
			this.ball_velocity[1] *= -1;
			this.ball[1] = 1;
		}

		//Ugly conditionals, but eh not familiar with javascript syntactically and it works
		//Consider cases when a player blocks with their paddle
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
			document.getElementbyID("boing").play();
			var audio = new Audio("boing.mp3");
			audio.play();
			var audio2 = new Audio("https://raw.githubusercontent.com/benjamin-zimmerman/multiplayer-pong/dev/public/boing.mp3");
			//function() { audio2.play(); }
			audio2.play();
			
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
			document.getElementbyID("boing").play();
			var audio2 = new Audio("https://raw.githubusercontent.com/benjamin-zimmerman/multiplayer-pong/dev/public/boing.mp3");
			//function() { audio2.play(); }
			audio2.play();
		}
	}

	reset(player) {
		if (player == 1) {
			this.ball = [60, 50];
			this.ball_velocity = [-MIN_SPEED / 3, 0];
		} else {
			this.ball = [40, 50];
			this.ball_velocity = [MIN_SPEED / 3, 0];
		}
	}
}
