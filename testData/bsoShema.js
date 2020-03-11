// let t = {
//     "Name": "string",
//     "ProjectType": {
//       "SysName": "Default",
//       "Id": "e5ecb5b5-9c54-ea11-80cd-c9338a53d791",
//       "Name": "Акт"
//     },
//     "Parent": null,
//     "ProjectGroup": null,
//     "ProjectFolder": null,
//     "Responsible": {
//       "Id": "50a41841-ed52-ea11-80cd-c9338a53d791",
//       "Name": "Мурашов Сегрей"
//     }
//   }

//   let tagsArray = {
//     'seriyabso_act': 'seriyabso_act_2', 
//     'vidbso': 'vidbso_2', 
//     'nomerbsos': 'nomerbsos_2', 
//     'kolbso', 
//     'actType', 
//     'zayavitel', 
//     'actType'
//   }




//   //+++Блок установочных параметров
// let instanse = 'case2.renins.com',//Полное название инстенса
// // tagCountField = 'osagoPolisIdTag',//Системный тег поля с счетчиком
// tagDateFromField = 'osagoPolisIdTag';//Системный тег поля с датой начала отсчета
// //---Блок установочных параметров

// let projectId = '12080cdf-3656-4584-9f8e-ab7200df4caf'
// responseBlocks = fetch({
//     url: 'https://'+instanse+'/api/ProjectCustomValues/GetAllVisualBlocks?ProjectId=' + projectId,
//     method: 'GET'
// }),
// responseProject = fetch({
//     url: 'https://'+instanse+'/api/Projects/GetProject/' + projectId,
//     method: 'GET'
// }),
// responseBlocksData = JSON.parse(responseBlocks.body),
// responseProjectData = JSON.parse(responseProject.body);



// fetch({
// url: 'https://wlablab.bpium.ru/api/webrequest/hooked', 
// method: 'POST', 
// body: responseBlocks.body
// }
// );

// console.log( responseBlocks.body )

let test = new Date();

console.log(
    test
)