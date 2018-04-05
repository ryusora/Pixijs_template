import { StateLoading } from './StateLoading';

export class StatesManager{
	constructor(){
		this.prevState = null
		this.currentState = null
	}
	ChangeState(state) {
		if (this.currentState != null) {
			this.prevState = this.currentState;
		}
		this.currentState = state;
		this.currentState.Init();

		if (this.prevState != null) {
			this.prevState.Destroy();
		}
	}
	FixedUpdate(dt) {
		if (this.currentState != null && this.currentState.FixedUpdate) {
			this.currentState.FixedUpdate(dt);
		}
	}

	Update(dt) {
		if (this.currentState != null) {
			this.currentState.Update(dt);
		}
	}
}