export class charSetting {
    
}

export class ShareService {  
    title: string
 
    user_id: string

    user_info: any

    crop_user: any
    selected_crop_user: any

    sensor_info: any

    constructor() {
        this.title = 'Dashboard'

        this.sensor_info = []

        this.crop_user = []
        this.selected_crop_user = "0"
    }
}