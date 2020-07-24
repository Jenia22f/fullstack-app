export interface User {
  email: string,
  password: string,
}

export interface Category {
  name: string,
  imageSrc?: string,
  user?: string,
  _id?: string
}

export interface Message {
  message: string
}

export interface Position {
  name: string,
  cost: number,
  category: string,
  user?: string,
  _id?: string,
  quantity?: number
}

export interface Order {
  date?: Date,
  order?: number,
  user?: string,
  list: OrderPosition[],
  _id?: string
}

export interface OrderPosition {
  name: string,
  cost: number,
  quantity: number,
  _id?: string
}

export interface Filter {
  start?: Date,
  end?: Date,
  order?: number
}

export interface OverviewPage {
  orders: OverviewPageItem,
  gain: OverviewPageItem
}

export interface OverviewPageItem {
  percent: number,
  compare: number,
  yesterday: number,
  isHigher: boolean
}

export interface AnalyticsPage {
  average: number,
  chart: AnalyticsChartItem[]
}

export interface AnalyticsChartItem {
  gaine: number,
  order: number,
  label: string
}

export interface Countries {
  Country: string,
  Slug: string,
  ISO2: string
}

export interface Total {
  NewConfirmed: Number,
  TotalConfirmed: Number,
  NewDeaths: Number,
  TotalDeaths: Number,
  NewRecovered: Number,
  TotalRecovered: Number
}

export interface CountryLiveData {
  Active: Number
  City: string
  CityCode: string
  Confirmed: Number
  Country: string
  CountryCode: string
  Date: Date
  Deaths: Number
  Lat: string
  Lon: string
  Province: string
  Recovered: Number
}
