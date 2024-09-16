export enum GameEvents {
	NEW_PLAYER = 'new_player',
	PLAYER_LEFT = 'player_left',
	USER_READY = 'user_ready',
	USER_CONNECT = 'user_connect',
	USER_DISCONNECT = 'user_disconnect',

	START_GAME = 'start_game',
	FINISH_GAME = 'finish_game',

	ADD_ATTACK_CARD = 'add_attack_card',
	ADD_DEFEND_CARD = 'add_defend_card',

	CANT_ATTACK = 'cant_attack',
	CANT_DEFEND = 'cant_defend',
	CANT_PASS = 'cant_pass',
	CANT_GET = 'cant_get',

	MUST_ATTACK = 'must_attack',
	MUST_DEFEND = 'must_defend',
}
