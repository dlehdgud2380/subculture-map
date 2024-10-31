/* otaroad.admin.request.js by LeeDongHyeong */

// 백엔드 서버 주소 설정
const openBetaUrl = 'https://otaroad-oracle-cloud.wahoo-in.ts.net';
const browserUrl = window.location.href

// 백엔드 URL확인
// 브라우저 주소창의 URL이 betaUrl이랑 같지 않으면
const url = window.location.href != openBetaUrl
    ? getTestServerAddress(browserUrl, "7500") + "/v1/shop/" : openBetaUrl + "/v1/shop/";

// 매장리스트 MAP
let shopList = new Map();

// shopType MAP
let shopTypeList = new Map();

// shopLocationType MAP
let locationList = new Map();

// shopKeyList MAP
let shopKeyList = new Map();

// 테이블 데이터 다시 요청 하는 함수
function reloadShopList() {

    // tbody 엘리먼트 찾기
    const tbody = document.getElementById('map-data-tbody');

    // tbody안에 있는 cell들 모두제거
    tbody.innerText = "";

    // 리퀘스트 요청해서 새로운 데이터 받아오기
    getRequest();
}

// 검색으로 데이터 요청하는 경우
function search() {
    // tbody 엘리먼트 찾기
    const tbody = document.getElementById('map-data-tbody');

    // tbody안에 있는 cell들 모두제거
    tbody.innerText = "";

    // 리퀘스트 요청해서 새로운 데이터 받아오기
    getRequest();

}

// 테이블 데이터 수정 후 request 하는 함수
function editShopInfo() {
    //const body = getFormData('dataAddModalForm');
}

// 테이블 데이터 제거 후 request 하는 함수
function deleteShopInfo() {

}

// 테이블에 데이터 추가 request 하는 함수
function addShopInfo() {
    const body = getFormData('dataAddModalForm');
    setRequest('POST', body);
}


// HTTP.GET Request
function getRequest(query) {
    let requestQuery;

    Promise.all([
        fetch(url)
            .then(handleResponse)
            .catch(handleError)
            .then(handleData)]
    )
}


// HTTP.POST, HTTP.PUT Request
function setRequest(method, body) {
    let requestBody = new Object();
    let cookie = getCookie();

    // http.method별 body 및 쿼리 작성
    switch (method) {
        case 'POST':
            requestBody = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    'accept': 'application/json',
                    'X-CSRFToken': cookie.csrftoken
                },
                body: JSON.stringify(body)
            }
            break;

        case 'PUT':
            requestBody = {
                method: "PUT",
                body: JSON.stringify(body)
            }
            break

        default:
            console.error("Please input http method parameter!")
    }

    Promise.all([
        fetch(url, requestBody)
            .then(handleResponse)
            .catch(handleError)
            .then(reloadShopList)]
    )
}

// 요청 핸들링
function handleResponse(response) {
    if (!response.ok) {
        throw new Error(response);
    }
    return response.json();
}

// 성공 핸들링
function handleData(data) {

    // 매장 데이터 분리
    locationList = listToMap(data.result.location_list, "location");

    // shopType 데이터 분리
    shopTypeList = listToMap(data.result.shoptype_list, "shoptype");

    // shopLocationType 데이터 분리
    shopList = listToMap(data.result.shop_list, "shoplist");

    // shopKeyList 데이터 분리
    shopKeyList = data.metadata.shop_key_list

    // TABLE에 데이터 삽입
    shopList.forEach((shop) => {
        dataInsertToTable(shop);
    });

}

// 에러 핸들링
function handleError(error) {
    alert(error);
}

// 초기 실행
getRequest();