export class ShareService {  
    title: string
 
    user_id: string

    user_info: any

    crop_user: any
    selected_crop_user: any

    sensor_info: any

    real_time_sensor_data: any
    real_time_sensor_data_label: any

    isDataAvailable: any

    history_search_temp: any
    constructor() {
        this.title = 'Dashboard'

        this.sensor_info = []

        this.crop_user = []
        this.selected_crop_user = "0"

        this.real_time_sensor_data = []
        this.real_time_sensor_data.push([{data:[], label:""}])

        this.real_time_sensor_data_label = []
        this.real_time_sensor_data_label.push([])

        this.isDataAvailable = false

        this.history_search_temp = []
    }

    public updateCropUser() {
        var crop_user_idx = parseInt(this.selected_crop_user)
        var sensor_num = this.crop_user[crop_user_idx].sensors.length

        this.real_time_sensor_data = new Array(sensor_num)
        this.real_time_sensor_data_label = new Array(sensor_num)

        for (var i = 0; i < sensor_num; ++i) {
          this.real_time_sensor_data[i] = new Array()
          this.real_time_sensor_data[i].push({data:[], label:""})

          this.real_time_sensor_data_label[i] = new Array()
          this.real_time_sensor_data_label[i].push([])
        }
    }
}