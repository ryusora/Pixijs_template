import { StateLoading } from './StateLoading';

export class States {
	static LOADING = 0;
	static MAIN_MENU = 1;
	static IN_GAME = 2;
	static END_SCREEN = 3;
	static REVIVE = 4;
}

export class StatesManager{
	constructor(appStage){
		this.appStage = appStage;
		this.stack = [];
		this.SwitchState(States.LOADING);
	}
	GetStateFromID(id){
		switch(id){
			case States.LOADING:
				this.stateLoading = this.stateLoading || new StateLoading();
				return this.stateLoading;
		}
		throw "Cannot get state from id " + id;
	}
	SwitchState(stateID) {
		let prevState = this.stack.pop();
		this.currentState = this.GetStateFromID(stateID);
		this.currentState.Init(this.appStage);
		this.stack.push(this.currentState);
		if (prevState != null) {
			prevState.Destroy();
		}
	}

	Update(dt) {
		if (this.currentState != null) {
			this.currentState.Update(dt);
		}
	}
}