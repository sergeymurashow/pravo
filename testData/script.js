// // const parser = require("");

// // let test = `<s:Envelope xmlns:s="http://schemas.xmlsoap.org/soap/envelope/">
// //    <s:Body xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema">
// //       <DoAddressCleanResponse xmlns="http://renins.com/">
// //          <DoAddressCleanResult>
// //             <KladrCode>61405000000</KladrCode>
// //             <IsSuccess>true</IsSuccess>
// //             <Country>РОССИЯ</Country>
// //             <County>ОБЛАСТЬ РЯЗАНСКАЯ</County>
// //             <Region/>
// //             <Town>ГОРОД КАСИМОВ</Town>
// //             <Street>УЛИЦА ГУБАРЕВА</Street>
// //             <Building>49</Building>
// //             <ZIP>391302</ZIP>
// //          </DoAddressCleanResult>
// //       </DoAddressCleanResponse>
// //    </s:Body>
// // </s:Envelope>`





//Скрипт считает количество дней прошедших с произвольной даты указанной в поле
//Точка перехода между днями 3:00 /три часа ночи/, поэтому автоматический запуск
//ставить на время после трёх. Поле куда заносится значение должно иметь тип "Число"
//и быть проинициализированно какм либо значением /значение по умолчанию = 0/

//+++Блок установочных параметров
let instanse = 'projects.casepro.pro',//Полное название инстенса
	tagCountField = 'CountFromDate',//Системный тег поля с счетчиком
	tagDateFromField = 'DateFrom';//Системный тег поля с датой начала отсчета
//---Блок установочных параметров

let projectId = context.ProjectId,
    responseBlocks = fetch({
        url: 'https://'+instanse+'/api/ProjectCustomValues/GetAllVisualBlocks?ProjectId=' + projectId,
        method: 'GET'
    }),
    responseProject = fetch({
        url: 'https://'+instanse+'/api/Projects/GetProject/' + projectId,
        method: 'GET'
    }),
    responseBlocksData = JSON.parse(responseBlocks.body),
    responseProjectData = JSON.parse(responseProject.body);

	
let fromDateValue = GetValueByExternalId(tagDateFromField, responseBlocksData);
let DiffSec = Date.now() / 1000 - Date.parse(fromDateValue) / 1000;
let CaseOpenDay = Math.floor(DiffSec / 86400);
if (!PutValueByExternalId(tagCountField, responseBlocksData, CaseOpenDay)) console.log('Поле не найдено');

let requestBlocks = responseProjectData.Result;
	requestBlocks.Blocks = responseBlocksData.Result.Blocks;

var responceUpdate = fetch({
	url: 'https://'+instanse+'/api/Projects/UpdateProjectWithBlocks',
	method: 'PUT',
	body: JSON.stringify(requestBlocks),
	headers: {
		'Content-Type': 'application/json'
	}
});

/////////////////////////////////////////////////////////////////////////
//Дополнительные функции

//Получение значения из поля по его Системному тегу
function GetValueByExternalId(ExtID, RespBData) {
	let Value = '';
	RespBData.Result.MetadataOfBlocks.forEach((BlockMeta) => {
		BlockMeta.Lines.forEach((LineMeta) => {
			LineMeta.Fields.forEach((FieldMeta) => {
				if (FieldMeta.ExternalTag === ExtID) {
					RespBData.Result.Blocks.forEach((Block) => {
						Block.Lines.forEach((Line) => {
							Line.Values.forEach((Field) => {
								if (Field.VisualBlockProjectFieldId === FieldMeta.Id) {
									Value = Field.Value;
								}
							});
						});
					});
				}
			});
		});
	});
	return Value;
}

//Запись значения в поле по Ситсемному тегу
function PutValueByExternalId(ExtID, RespBData, NewValue) {
	let isOK = false;
	RespBData.Result.MetadataOfBlocks.forEach((BlockMeta) => {
		BlockMeta.Lines.forEach((LineMeta) => {
			LineMeta.Fields.forEach((FieldMeta) => {
				if (FieldMeta.ExternalTag === ExtID) {
					RespBData.Result.Blocks.forEach((Block) => {
						Block.Lines.forEach((Line) => {
							Line.Values.forEach((Field) => {
								if (Field.VisualBlockProjectFieldId === FieldMeta.Id) {
									Field.Value = NewValue;
									isOK = true;
								}
							});
						});
					});
				}
			});
		});
	});
	return isOK;
}