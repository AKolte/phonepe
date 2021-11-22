export const fetchCategoryData = (filter) => {
    const { year ,quarter, state } = filter;
    let dataInJson, extractedData;
    
    dataInJson = require(`./categoryData/state/${state.replaceAll(' ', '-')}/${year}/${quarter}.json`)
    extractedData = dataInJson.data.transactionData
    return extractedData;
}

export const fetchData = (filter) => {
    const { year ,quarter, geo, state, district } = filter;
    let dataInJson, extractedData;
    if (geo === 'state-wise') {
        dataInJson = require(`./data/${year}/${quarter}.json`)
        extractedData = dataInJson.data.hoverDataList?.filter(eachState => eachState.name === state);
    } else if (state) { //district-wise
        dataInJson = require(`./data/states/${state?.replaceAll(' ', '-')}/${year}/${quarter}.json`)
        extractedData = dataInJson.data.hoverDataList.filter(eachDistrict => eachDistrict.name === `${district}`)[0];
    }
    return extractedData;
  }

export const getAllStateNames = () => {
    const sampleDataInJson = require('./data/2018/1.json')
    const states = sampleDataInJson.data.hoverDataList.map(eachState => eachState.name)
    return states
}

export const getDistricts = (state) => {
    const sampleDataInJson = require(`./data/states/${state.replaceAll(' ', '-')}/2021/1.json`)
    const districts = sampleDataInJson.data.hoverDataList.map(eachDistrict => eachDistrict.name)
    return districts
}
