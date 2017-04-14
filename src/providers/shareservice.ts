import * as moment from 'moment-timezone';

export class ShareService {  
    title: string
 
    user_id: string

    user_info: any

    crop_user: any
    selected_crop_user: any

    sensor_info: any

    real_time_data_range: any

    real_time_sensor_data: any
    real_time_sensor_data_label: any

    real_time_water_consumption_data: any
    real_time_water_consumption_label: any

    real_time_daily_water_usage_data: any
    real_time_daily_water_usage_label:any

    isDataAvailable: any

    daily_water_usage_header: any

    constructor() {
        this.title = 'Dashboard'

        this.sensor_info = []

        this.crop_user = []
        this.selected_crop_user = "0"

        this.real_time_sensor_data = []
        this.real_time_sensor_data.push([{data:[], label:""}])

        this.real_time_sensor_data_label = []
        this.real_time_sensor_data_label.push([])

        this.real_time_water_consumption_data = []
        this.real_time_water_consumption_data.push([{data:[], label:""}])

        this.real_time_water_consumption_label = []
        this.real_time_water_consumption_label.push([])

        this.real_time_daily_water_usage_data = [0, 0]
        this.real_time_daily_water_usage_label = ['Used', 'Available']

        this.real_time_data_range = 60 // minutes

        this.isDataAvailable = false
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

    public getCropUserId() {
        var selected_crop_user_idx = parseInt(this.selected_crop_user)

        return this.crop_user[selected_crop_user_idx]._id
    }

    public getBayTime() {
        var now = moment().utc()
        return now.subtract(7, 'h')
    }
}