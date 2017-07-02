
var StateLoading = function(){
	this.isLoadingDone = false
	this.loadingIcon = null;
}

StateLoading.prototype.Init = function(){
	if(this.isLoadingDone) return

	// init loading icon
	this.loadingIcon = new PIXI.Sprite(TextureManager.getTexture('LOADING'))
	this.loadingIcon.width = 100
	this.loadingIcon.height = 100
	this.loadingIcon.anchor.set(0.5)
	this.loadingIcon.x = (Application.getScreenWidth()/2)
	this.loadingIcon.y = (Application.getScreenHeight()/2)
	this.stage = new PIXI.Container()
	this.stage.addChild(this.loadingIcon)
	Application.addChild(this.stage)
	Application.Align(this.stage)

	var characterName = GameStates.stateChooseCharacter.characterName
	var currentLevel = GameStates.stateChooseLevel.currentLevelName
	// loading texture
	var textureList = {
		// // Character
		// 'mainChar_ske'		:'Assets/characters/' + characterName + '/mainChar_ske.json',
		// 'mainChar_tex_data'	:'Assets/characters/' + characterName + '/mainChar_tex.json',
		// 'mainChar_tex'		:'Assets/characters/' + characterName + '/mainChar_tex.png',
		// // BG
		// 'background'		:'Assets/backgrounds/' + currentLevel + '/bg.png',
		// // Enemy
		// 'enemy_ske'			:'Assets/Enemy/' + currentLevel + '/enemy_ske.json',
		// 'enemy_tex_data'	:'Assets/Enemy/' + currentLevel + '/enemy_tex.json',
		// 'enemy_tex'			:'Assets/Enemy/' + currentLevel + '/enemy_tex.png',

		// male
		'male_mainChar_ske'			:'Assets/characters/male/mainChar_ske.json',
		'male_mainChar_tex_data'	:'Assets/characters/male/mainChar_tex.json',
		'male_mainChar_tex'			:'Assets/characters/male/mainChar_tex.png',
		// female
		'female_mainChar_ske'		:'Assets/characters/female/mainChar_ske.json',
		'female_mainChar_tex_data'	:'Assets/characters/female/mainChar_tex.json',
		'female_mainChar_tex'		:'Assets/characters/female/mainChar_tex.png',
		// ============= DauLung =====================
		'DauLung_background'			:'Assets/backgrounds/DauLung/bg.png',
		// Enemy
		'DauLung_enemy_ske'			:'Assets/Enemy/DauLung/enemy_ske.json',
		'DauLung_enemy_tex_data'		:'Assets/Enemy/DauLung/enemy_tex.json',
		'DauLung_enemy_tex'			:'Assets/Enemy/DauLung/enemy_tex.png',
		// ============= HoHap =====================
		'HoHap_background'			:'Assets/backgrounds/HoHap/bg.png',
		// Enemy
		'HoHap_enemy_ske'			:'Assets/Enemy/HoHap/enemy_ske.json',
		'HoHap_enemy_tex_data'		:'Assets/Enemy/HoHap/enemy_tex.json',
		'HoHap_enemy_tex'			:'Assets/Enemy/HoHap/enemy_tex.png',
		// ============= SinhSan =====================
		'SinhSan_background'			:'Assets/backgrounds/SinhSan/bg.png',
		// Enemy
		'SinhSan_enemy_ske'			:'Assets/Enemy/SinhSan/enemy_ske.json',
		'SinhSan_enemy_tex_data'		:'Assets/Enemy/SinhSan/enemy_tex.json',
		'SinhSan_enemy_tex'			:'Assets/Enemy/SinhSan/enemy_tex.png',
		// ============= TieuHoa =====================
		'TieuHoa_background'			:'Assets/backgrounds/TieuHoa/bg.png',
		// Enemy
		'TieuHoa_enemy_ske'				:'Assets/Enemy/TieuHoa/enemy_ske.json',
		'TieuHoa_enemy_tex_data'		:'Assets/Enemy/TieuHoa/enemy_tex.json',
		'TieuHoa_enemy_tex'				:'Assets/Enemy/TieuHoa/enemy_tex.png',
		// ============= ThanKinh =====================
		'ThanKinh_background'			:'Assets/backgrounds/ThanKinh/bg.png',
		// Enemy
		'ThanKinh_enemy_ske'			:'Assets/Enemy/ThanKinh/enemy_ske.json',
		'ThanKinh_enemy_tex_data'		:'Assets/Enemy/ThanKinh/enemy_tex.json',
		'ThanKinh_enemy_tex'			:'Assets/Enemy/ThanKinh/enemy_tex.png',
		// ============= RungToc =====================
		'RungToc_background'			:'Assets/backgrounds/RungToc/bg.png',
		// Enemy
		'RungToc_enemy_ske'				:'Assets/Enemy/RungToc/enemy_ske.json',
		'RungToc_enemy_tex_data'		:'Assets/Enemy/RungToc/enemy_tex.json',
		'RungToc_enemy_tex'				:'Assets/Enemy/RungToc/enemy_tex.png',
		// ============= HoHap =====================
		// 'HoHap_background'			:'Assets/backgrounds/HoHap/bg.png',
		// // Enemy
		// 'HoHap_enemy_ske'			:'Assets/Enemy/HoHap/enemy_ske.json',
		// 'HoHap_enemy_tex_data'		:'Assets/Enemy/HoHap/enemy_tex.json',
		// 'HoHap_enemy_tex'			:'Assets/Enemy/HoHap/enemy_tex.png',
	}
	TextureManager.load(textureList, ()=>{
		this.isLoadingDone = true
	})
}

StateLoading.prototype.IsLoadDone = function()
{
	return this.isLoadingDone
}

StateLoading.prototype.Destroy = function(){
	Application.removeChild(this.stage)
	this.loadingIcon = null
}

StateLoading.prototype.Update = function(dt)
{
	// if(this.isLoadingDone && FireBaseManager.isInitialized)
	if(this.isLoadingDone)
	{
		// do something when textures are loaded
		StatesManager.ChangeState(GameStates.stateTutorial)
		// StatesManager.ChangeState(GameStates.stateQuiz)
		//StatesManager.ChangeState(GameStates.stateResult)
	}
	else
	{
		// rotate loading icon
		this.loadingIcon.rotation += dt * 0.1
	}
}

module.exports = StateLoading