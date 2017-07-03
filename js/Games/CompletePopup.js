var CompletePopup = function()
{
    this.stage = new PIXI.Container()

    this.fadeEffect = new PIXI.Graphics()
	// init graphic
	this.fadeEffect.beginFill(0x000000)
	this.fadeEffect.drawRect(0,0,Application.getScreenWidth(), Application.getScreenHeight())
	this.fadeEffect.alpha = 0.5
    this.stage.addChild(this.fadeEffect)

    this.popup = new PIXI.Sprite(TextureManager.getTexture('Complete_popup'))
    this.popup.position.set(Application.getScreenWidth()*0.5, Application.getScreenHeight()*0.5)
    this.popup.anchor.set(0.5, 0.5)
    this.popup.interactive = true
    this.popup.on('pointerdown', ()=>{
        Application.removeChild(this.stage)
        this.IsOnScreen = false
    })

    this.stage.addChild(this.popup)

    var textStyle = new PIXI.TextStyle({
        fontFamily: 'Arial',
        fontSize: 30,
        fontWeight: 'bold',
        fill: ['#4a2268'], // white
    })
    var congratulation = new PIXI.Text("BẠN ĐÃ HOÀN THÀNH", textStyle)
    congratulation.position.set(Application.getScreenWidth()*0.5, Application.getScreenHeight()*0.5 + 200)
    congratulation.anchor.set(0.5, 0.5)

    this.stage.addChild(congratulation)

    this.hanhTrinh = new PIXI.Text("HÀNH TRÌNH HÔ HẤP", textStyle)
    this.hanhTrinh.position.set(Application.getScreenWidth()*0.5, Application.getScreenHeight()*0.5 + 250)
    this.hanhTrinh.anchor.set(0.5, 0.5)

    this.stage.addChild(this.hanhTrinh)

    this.IsOnScreen = false

    this.levelsName = {
		"HoHap"		:"HÔ HẤP",
		"SinhSan"	:"SINH SẢN",
		"ThanKinh"	:"CHÓNG MẶT",
		"RungToc"	:"RỤNG TÓC",
		"DacBiet"	:"ĐẶC BIỆT",
		"DauLung"	:"ĐAU LƯNG",
		"TieuHoa"	:"TIÊU HÓA"
	}

    this.Show = function(levelName)
    {
        this.hanhTrinh.text = "HÀNH TRÌNH " + this.levelsName[levelName]
        this.IsOnScreen = true
        Application.addChild(this.stage)
    }
}

module.exports = CompletePopup