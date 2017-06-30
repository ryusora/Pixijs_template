require('pixi.js')

var StateLogo = function(){
	this.logoSprite = null
	this.isLoadingDone = false
	this.ticker = 0
	this.fadeValue = 5
}

StateLogo.prototype.Init = function(){
	TextureManager.load({
		'LOGO'		:'Assets/abbott-logo.jpg',
		'LOADING'	:'Assets/loading-icon.png',
		'MENU_BG'	:'Assets/Menu/bg.png',
		'BTN_START'	:'Assets/btn_play.png',
		'HEADER_LOGO':'Assets/Menu/title.png',
		'BTN_OK'	:'Assets/Menu/ok_icon.png',
		// Menu Choose Characters
		'cc_title'			:'Assets/Menu/ChooseCharacters/select_icon.png',
		'cc_male_icon'		:'Assets/Menu/ChooseCharacters/male_icon.png',
		'cc_female_icon'	:'Assets/Menu/ChooseCharacters/female_icon.png',
		'cc_ready_btn'		:'Assets/Menu/ChooseCharacters/start_icon.png',
		'cc_sound_on_btn'	:'Assets/Menu/ChooseCharacters/sound_icon.png',
		'cc_hint_btn'		:'Assets/Menu/ChooseCharacters/hint_icon.png',
		
		// menu choose level
		'cl_characters_male'	:'Assets/Menu/ChooseLevels/male.png',
		'cl_characters_female'	:'Assets/Menu/ChooseLevels/female.png',
		'cl_title'				:'Assets/Menu/ChooseLevels/select_level.png',
		'cl_ready_btn'			:'Assets/Menu/ChooseLevels/ready_icon.png',
		'cl_back_btn'			:'Assets/Menu/ChooseLevels/back_icon.png',
		'cl_circle'				:'Assets/Menu/ChooseLevels/circle.png',
		'HoHap'					:'Assets/Menu/ChooseLevels/ho_hap.png',
		'ThanKinh'				:'Assets/Menu/ChooseLevels/chong_mat.png',
		'DauLung'				:'Assets/Menu/ChooseLevels/dau_lung.png',
		'RungToc'				:'Assets/Menu/ChooseLevels/rung_toc.png',
		'SinhSan'				:'Assets/Menu/ChooseLevels/suc_khoe_ss.png',
		'TieuHoa'				:'Assets/Menu/ChooseLevels/tieu_hoa.png',
		'DacBiet'				:'Assets/Menu/ChooseLevels/dac_biet.png',
		'HoHap_highlight'		:'Assets/Menu/ChooseLevels/ho_hap_hilight.png',
		'ThanKinh_highlight'	:'Assets/Menu/ChooseLevels/chong_mat_hilight.png',
		'DauLung_highlight'		:'Assets/Menu/ChooseLevels/dau_lung_hilight.png',
		'RungToc_highlight'		:'Assets/Menu/ChooseLevels/rung_toc_hilight.png',
		'SinhSan_highlight'		:'Assets/Menu/ChooseLevels/suc_khoe_ss_hilight.png',
		'TieuHoa_highlight'		:'Assets/Menu/ChooseLevels/tieu_hoa_hilight.png',
		'DacBiet_highlight'		:'Assets/Menu/ChooseLevels/dac_biet_hilight.png',

		// menu result
		'rs_board'			:'Assets/Menu/Leaderboard/Board.png',
		'rs_replay_btn'		:'Assets/Menu/Leaderboard/ChoiLai.png',
		'rs_chooseLevel'	:'Assets/Menu/Leaderboard/ChonManHinh.png',
		'rs_start'			:'Assets/Menu/Leaderboard/Star.png',
		'rs_title'			:'Assets/Menu/Leaderboard/title.png',
		'rs_score_border'	:'Assets/Menu/Leaderboard/score_border.png',
		'rs_diem_hanh_trinh':'Assets/Menu/Leaderboard/diemhanhtrinh.png',

		// choose character animation
		'ChooseCharacters_ske'		:'Assets/Menu/ChooseCharacters/ChooseCharacters_ske.json',
		'ChooseCharacters_tex_data'	:'Assets/Menu/ChooseCharacters/ChooseCharacters_tex.json',
		'ChooseCharacters_tex'		:'Assets/Menu/ChooseCharacters/ChooseCharacters_tex.png',

		// HUD
		'hud_bg'			:'Assets/HUD/hud_bar_bg.png',
		'hud_live_male'		:'Assets/HUD/hud_bar_live.png',
		'hud_live_female'	:'Assets/HUD/hud_bar_live_girl.png',
		'hud_score'			:'Assets/HUD/hud_bar_score.png',
		'hud_pause'			:'Assets/HUD/hud_btn_pause.png',
		// effect
		'effect_ske'		:'Assets/items/effect_ske.json',
		'effect_tex_data'	:'Assets/items/effect_tex.json',
		'effect_tex'		:'Assets/items/effect_tex.png',
		// Tutorial
		'TUTORIAL'			:'Assets/Menu/Cach_choi.jpg',
		// QUIZ
		'square'		:'Assets/Menu/QUIZ/square.png',
		'checkmark'		:'Assets/Menu/QUIZ/mark.png',
	}, ()=>{
		this.logoSprite = new PIXI.Sprite(TextureManager.getTexture('LOGO'))
		this.logoSprite.anchor.set(0.5, 0.5)
		this.logoSprite.x = (Application.getScreenWidth()/2)
		this.logoSprite.y = (Application.getScreenHeight()/2)
		this.logoSprite.alpha = 0
		this.stage = new PIXI.Container()
		this.stage.addChild(this.logoSprite)
		Application.addChild(this.stage)
		//Application.Align(this.stage)
		this.isLoadingDone = true
	})
	// Init
}

StateLogo.prototype.IsLoadDone = function()
{
	return this.isLoadingDone
}

StateLogo.prototype.Destroy = function(){
	Application.removeChild(this.stage)
	this.logoSprite = null
}

StateLogo.prototype.Update = function(dt)
{
	if(this.isLoadingDone)
	{
		this.ticker += dt * this.fadeValue
		this.logoSprite.alpha = this.ticker / Defines.LOGO_TIME
		if(this.ticker > Defines.LOGO_TIME)
		{
			this.ticker = Defines.LOGO_TIME
			this.fadeValue*=-1
		}
		else if(this.ticker < 0)
		{
			StatesManager.ChangeState(GameStates.stateChooseCharacter)
			//StatesManager.ChangeState(GameStates.stateResult)
		}
	}
}

module.exports = StateLogo