/* otaroad.admin.util.js by LeeDongHyeong */

/* 아래의 변수를 참고하여 코딩할 것
// 매장리스트 MAP
let shopList = new Map();

// shopType MAP
let shopTypeList = new Map();

// shopLocationType MAP
let locationList = new Map();

// shopKeyList -> 매장정보 키가 담겨있는 리스트
shopKeyList = data.metadata.shop_key_list
*/


/* table element에 데이터가 담긴 row 추가 하는 함수
  shop: 매장1개의 정보가 json형태로 담긴 파라미터
*/
function dataInsertToTable(shop) {

    // tbody 엘리먼트 찾기
    const tbody = document.getElementById('map-data-tbody');

    // row 객체 만들고 tr 넣기
    const newRow = tbody.insertRow();

    // cell 선언
    const cellId = newRow.insertCell();
    const cellName = newRow.insertCell();
    const cellLocation = newRow.insertCell();
    const cellAddress = newRow.insertCell();
    const cellShopType = newRow.insertCell();

    // 매장주소 길이 조정 해서 추가
    const shopAddress = shop.address;
    const shortAddress = shopAddress.length > 40
        ? shopAddress.slice(0, 70) + ' ...' : shopAddress;

    // text 노드 추가
    const textId = document.createTextNode(shop.id);
    const textName = document.createTextNode(shop.name);
    const textLocation = document.createTextNode(locationList.get(shop.location).location);
    const textAddress = document.createTextNode(shortAddress);

    // 매장이름 element 추가 
    const aName = document.createElement('a');
    aName.setAttribute('class', 'link-opacity-50-hover');
    aName.setAttribute('href', "#");
    aName.setAttribute('onclick', 'loadShopInfo(' + shop.id + ')');
    aName.appendChild(textName);

    // cell에 element 추가
    cellId.appendChild(textId);
    cellName.appendChild(aName);
    cellLocation.appendChild(textLocation);
    cellAddress.appendChild(textAddress);

    // 매장 태그 추가
    for (let i = 0; i < shop.shopType.length; i++) {
        const shopTypeNumber = shop.shopType[i];
        const shopTypeName = i < shop.shopType.length - 1
            ? shopTypeList.get(shopTypeNumber).type + ", " : shopTypeList.get(shopTypeNumber).type;
        const textShopType = document.createTextNode(shopTypeName);
        cellShopType.appendChild(textShopType);
    }
}

/* 매장 정보 양식 UI 만들어 주는 함수
    ModalName: ModalID 이름 넣는 인자 -> 그 모달에 대한 맞는 UI 만들어줌
    editable: 각각 오브젝트를 수정가능하게 만들것인지 안되게 할 것인지 확인
*/
/*
function makeBasicTempete(shopId="", ModalName, editable=false) {
        // 모달 표시
        const modal = new bootstrap.Modal(ModalName);
        modal.show();
    
        // modal body 안에 있는 input group text 안에 데이터 넣기
        const ModalBodyContainer = document.getElementById(ModalName + "-Body-Container");
        ModalBodyContainer.innerText = ""; // 기존에 있던 내용들 초기화
    
        // object의 Key만큼 반복
        for (let i = 1; i < shopKeyList.length; i++) {
            const objectKeyName = shopKeyList[i];
    
            const inputGroup = document.createElement("div");
            inputGroup.setAttribute("class", "input-group mb-3");
    
            const span = document.createElement("span");
            const spanText = document.createTextNode(objectKeyName);
            span.setAttribute("class", "input-group-text");
            span.appendChild(spanText);
    
            const input = document.createElement("input");
            input.setAttribute("type", "text");
            input.setAttribute("class", "form-control");
    
            const textarea = document.createElement("textarea");
    
            switch (objectKeyName) {
                case "workTime":
                    textarea.setAttribute("class", "form-control");
                    textarea.setAttribute("rows", "3");
    
                    inputGroup.appendChild(span);
                    inputGroup.appendChild(textarea);
                    break;
    
                case "content":
                    textarea.setAttribute("class", "form-control");
                    textarea.setAttribute("rows", "7");
    
                    inputGroup.appendChild(span);
                    inputGroup.appendChild(textarea);
                    break;
    
                case "location":
                    inputGroup.appendChild(span);
                    inputGroup.appendChild(input);
                    break;
    
                case "shopType":
                    inputGroup.appendChild(span);
                    inputGroup.appendChild(input);
                    break;
    
                default:
                    inputGroup.appendChild(span);
                    inputGroup.appendChild(input);
            }
        }
}
*/

/*
    datainfomodal에서 '수정' 버튼을 눌렀을 경우 event가 발생하면서
    datainfoModal이 열리는 동시에 데이터를 수정할 수 있는 FormUI가 생성할 수 있도록
    도와주는 함수
*/
function editShopInfo(shopId) {
    //loadShopInfo(shopId, true);
    console.log("test");
}

/* row 하나 클릭했을 때 매장 정보를 모달로 불러오는 함수
  shopId: response 받은 데이터 내의 shoplist 보면 id라고 적힌 것
  editable: 각각 오브젝트를 수정가능하게 만들것인지 안되게 할 것인지 확인
*/
function loadShopInfo(shopId, editable = false) {

    // 매장 ID로 해당하는 매장정보 가져오기
    const shopData = shopList.get(shopId);

    // 모달 표시
    const dataInfoModal = new bootstrap.Modal('#dataInfoModal');
    dataInfoModal.toggle();

    // 모달 라벨 설정
    const dataInfoModalLabel = document.querySelector("#dataInfoModalLabel");
    dataInfoModalLabel.innerText = " '" + shopData.name + "' 매장정보";
    if (editable == true) {
        dataInfoModalLabel.innerText = "매장정보 수정";
    }

    // 모달 수정 버튼 설정
    const dataInfoModalEditButton = document.querySelector("#dataEditButton");
    dataInfoModalEditButton.addEventListener("click", () => {
        //dataInfoModal.hide();
        //loadShopInfo(shopId, true);
    })

    // modal body 안에 있는 input group text 안에 데이터 넣기
    const dataInfoModalBodyContainer = document.getElementById("dataInfoModal-Body-Container");
    dataInfoModalBodyContainer.innerText = ""; // 내용 초기화

    // object의 Key만큼 반복
    for (let i = 0; i < shopKeyList.length; i++) {
        const objectKeyName = shopKeyList[i];

        const inputGroup = document.createElement("div");
        inputGroup.setAttribute("class", "input-group mb-3");

        const span = document.createElement("span");
        const spanText = document.createTextNode(objectKeyName);
        span.setAttribute("class", "input-group-text");
        if (editable != true) {
            span.setAttribute("id", "input-disabled-" + objectKeyName);
        }
        span.appendChild(spanText);

        const input = document.createElement("input");
        input.setAttribute("type", "text");
        input.setAttribute("class", "form-control");
        if (editable != true) {
            input.setAttribute("disabled", "");
        }


        const textarea = document.createElement("textarea");

        switch (objectKeyName) {

            case "workTime":
                textarea.setAttribute("class", "form-control");
                textarea.setAttribute("rows", "3");
                if (editable != true) {
                    textarea.setAttribute("disabled", "");
                }


                const worktimeText = document.createTextNode(shopData[objectKeyName]);
                textarea.appendChild(worktimeText);

                inputGroup.appendChild(span);
                inputGroup.appendChild(textarea);
                break;

            case "content":
                textarea.setAttribute("class", "form-control");
                textarea.setAttribute("rows", "7");
                if (editable != true) {
                    textarea.setAttribute("disabled", "");
                }

                const contentText = document.createTextNode(shopData[objectKeyName]);
                textarea.appendChild(contentText);

                inputGroup.appendChild(span);
                inputGroup.appendChild(textarea);
                break;

            case "location":
                input.setAttribute("value", locationList.get(shopData["location"]).location);
                inputGroup.appendChild(span);
                inputGroup.appendChild(input);
                break;

            case "shopType":
                let tagText = "";
                const shopTypeLength = shopData["shopType"].length;
                for (let i = 0; i < shopTypeLength; i++) {
                    let typenum = shopData["shopType"][i];
                    i === shopTypeLength - 1 ? tagText += shopTypeList.get(typenum).type : tagText += shopTypeList.get(typenum).type + ", "
                }
                input.setAttribute("value", tagText);
                inputGroup.appendChild(span);
                inputGroup.appendChild(input);
                break;

            default:
                input.setAttribute("value", shopData[objectKeyName] == null ? "정보없음" : shopData[objectKeyName]);
                inputGroup.appendChild(span);
                inputGroup.appendChild(input);
        }

        dataInfoModalBodyContainer.appendChild(inputGroup);
    }

}




/*
    shopInfo admin에서 '추가' 버튼을 눌렀을 경우 event가 발생하면서
    dataAddModal이 열리는 동시에 데이터를 추가할 수 있는 FormUI가 생성할 수 있도록
    도와주는 함수
*/
function createShopInfo() {

    // 모달 표시
    const dataAddModal = new bootstrap.Modal('#dataAddModal');
    dataAddModal.show();

    // modal body 안에 있는 input group text 안에 데이터 넣기
    const dataAddModalBodyContainer = document.getElementById("dataAddModal-Body-Container");
    dataAddModalBodyContainer.innerText = ""; // 기존에 있던 내용들 초기화

    const form = document.createElement("form");
    form.setAttribute("id", "dataAddModalForm");
    form.setAttribute("onsubmit", "return false;");

    // object의 Key만큼 반복
    for (let i = 1; i < shopKeyList.length; i++) {
        const objectKeyName = shopKeyList[i];

        // Input Group 셍성
        const inputGroup = document.createElement("div");
        inputGroup.setAttribute("class", "input-group mb-3");

        // KeyName 부분에 대한 UI 생성
        const span = document.createElement("span");
        const spanText = document.createTextNode(objectKeyName);
        span.setAttribute("class", "input-group-text");
        span.appendChild(spanText);

        // Input 즉 데이터 넣는 부분에 대한 UI 생성
        const input = document.createElement("input");
        input.setAttribute("id", objectKeyName);
        input.setAttribute("type", "text");
        input.setAttribute("class", "form-control");

        // testarea HTML Element 생성 -> workTime, content
        const textarea = document.createElement("textarea");
        textarea.setAttribute("id", objectKeyName);

        // single option HTML Element 생성 -> location, shopType
        const select = document.createElement("select");
        select.setAttribute("id", objectKeyName)

        switch (objectKeyName) {
            case "workTime":
                textarea.setAttribute("class", "form-control");
                textarea.setAttribute("rows", "3");

                inputGroup.appendChild(span);
                inputGroup.appendChild(textarea);
                break;

            case "content":
                textarea.setAttribute("class", "form-control");
                textarea.setAttribute("rows", "7");

                inputGroup.appendChild(span);
                inputGroup.appendChild(textarea);
                break;

            case "photo":
                input.setAttribute("disabled", "");


                inputGroup.appendChild(span);
                inputGroup.appendChild(input);
                break;

            case "x":
                input.setAttribute("disabled", "");

                inputGroup.appendChild(span);
                inputGroup.appendChild(input);
                break;

            case "y":
                input.setAttribute("disabled", "");

                inputGroup.appendChild(span);
                inputGroup.appendChild(input);
                break;

            case "location":
                select.setAttribute("class", "form-select-lg" + " mb3");

                // location size 만큼 반복해서 option에 집어 넣기
                for (let i = 0; i <= locationList.size; i++) {
                    let location = i === 0 ? "" : locationList.get(i);
                    if (location == undefined) {
                        continue
                    }
                    let option = document.createElement("option");
                    let optionText = i === 0 ? document.createTextNode("지역을 선택해주세요.") : document.createTextNode(location.location);

                    if (i === 0) {
                        option.setAttribute("selected", "");
                    } else {
                        option.setAttribute("value", location.id);
                    }

                    option.appendChild(optionText);
                    select.appendChild(option);
                }

                inputGroup.appendChild(span);
                inputGroup.appendChild(select);
                break;

            case "shopType":
                select.setAttribute("class", "form-select");
                select.setAttribute("multiple", "");

                // location size 만큼 반복해서 option에 집어 넣기
                for (let i = 1; i <= shopTypeList.size; i++) {
                    let shopType = shopTypeList.get(i);
                    if (shopType == undefined) {
                        continue
                    }
                    let option = document.createElement("option");
                    let optionText = document.createTextNode(shopType.type);

                    option.setAttribute("value", shopType.id);

                    option.appendChild(optionText);
                    select.appendChild(option);
                }

                inputGroup.appendChild(span);
                inputGroup.appendChild(select);
                break;

            default:
                inputGroup.appendChild(span);
                inputGroup.appendChild(input);
        }

        form.appendChild(inputGroup);
        dataAddModalBodyContainer.appendChild(form);
    }
}

/* HTTP.POST(매장 데이터 추가) 또는 HTTP.PUT(매장 데이터 수정)할 떄 Modal에 있는 Form데이터 가져오는 함수
   가져온 데이터들을 object화 후 return
   modalFormId: dataAddModalForm 또는 dataEditModalForm을 입력 -> 다른 Form ID 입력하거나 빈 값인 경우 오류 발생
*/
function getFormData(modalFormId) {

    if (modalFormId != "dataAddModalForm" && modalFormId != "dataEditModalForm") {
        console.error("Invalid modalFormId. \n Please input dataAddModalForm or dataEditModalForm")
        return
    }

    let formData = document.getElementById(modalFormId);
    const objectBody = new Object();

    for (const keyName of shopKeyList) {
        if (keyName == "id") {
            continue;
        }

        if (keyName == "location") {
            objectBody[keyName] = Number(formData[keyName].value)
            continue;
        }

        if (keyName == "photo") {
            continue;
        }

        if (keyName === "x" || keyName === "y") {
            objectBody[keyName] = 0;
            continue;
        }

        // shopType같이 multiselect option을 사용하는 경우
        if (keyName === "shopType") {
            // options에서 selected 된 element의 value 찾기
            const values = [...formData["shopType"].options]
                .filter(option => option.selected)
                .map(option => Number(option.value));
            objectBody[keyName] = values;
            continue;
        }
        objectBody[keyName] = formData[keyName].value
    }

    console.log(objectBody);

    return objectBody;
}

/* getFormData에서 받은 데이터를 체킹 하는 함수
   값이 비어있는 지 아니면 올바르지 않은 데이터를 입력했는 지 확인
*/
function formValidation() {

}


/* list 타입을 Map 타입으로 변환하는 함수
  listTypeData: 데이터가 들어있는 list type의 데이터를 넣으면 됨
  type: response받은 데이터가 뭔지??? 
    -> 위치들: location, 매장데이터: shop, 매장종류: type
    -> 위의 3가지 이외의 값이 들어갈 경우 '에러' 뿜뿜 예정
*/
function listToMap(listTypeData, type) {

    if (type !== "location" && type !== "shoptype" && type !== "shoplist") {
        throw new Error("Invalid Response Data Type")
    }

    let mapTypeData = new Map();
    listTypeData.forEach(data => {
        switch (type) {
            case "location": mapTypeData.set(data.id, data.location);
            case "shoptype": mapTypeData.set(data.id, data.type);
            case "shoplist": mapTypeData.set(data.id, data);
        }
    });

    return mapTypeData;
}

/*
    웹브라우저에서 추출한 ip url 기반으로 URL 조합해주는 함수
    클로즈테스트 서버를 위한 함수임
*/
function getTestServerAddress(url, port) {
    const ipV4regex = /(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}/g;
    const httpsRegex = /(http(s)?:\/\/)/g;
    return url.match(httpsRegex)[0] + url.match(ipV4regex)[0] + ":" + port;
}

/* 웹브라우저에서 쿠키 가져오는 함수
    document.cookie 통해서 가져온 값을 ;로 split해서 배열화
    개수만큼 반복해서 cookie 한개를 key와 value로 나눈 object로 저장
    출력: object
*/
function getCookie() {
    let cookiesToObject = {};
    if (document.cookie && document.cookie !== '') {
        let cookies = document.cookie.split(';');
        cookies.forEach(cookie => {
            let temp = cookie.split('=');
            let cookieKey = temp[0];
            let cookieValue = temp[1];
            cookiesToObject[cookieKey] = cookieValue;
        })
    }
    return cookiesToObject;
}
