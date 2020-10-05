// './views/elementsPages/view' is root folder path . 
// 'index.vue' is the name of target files in the root folder './views/elementsPages/view'

const getRouterTree = function() {
    // const requireModule = require.context('./views/elementsPages/view', true,/folder$/)
    let newRouter = [];
    const requireModulefolder = require.context('./views/elementsPages/view', true, /\/$/);
    requireModulefolder.keys().forEach(folderRoute => {
        let folderUnit = folderRoute.length;
        let folderPath = folderRoute.substring(2, folderUnit - 1);

        let name__full = folderRoute.substring(0, folderUnit - 1);
        let name__full__StartIndex = name__full.lastIndexOf('/');
        let name = name__full.substring(name__full__StartIndex + 1, folderUnit);

        let folderPath__full = folderRoute.substring(2, folderUnit);

        let name__mainFolder = folderPath__full.substring(0, folderPath__full.indexOf('/'));

        let route = {
            name: name,
            path: name,
            component: () => import(/* webpackChunkName: "landingPage" */ `${'./views/elementsPages/view'}/${folderPath}/${'index.vue'}`),
            children: [],
            meta: {
                title: `UI Elements | ${name__mainFolder}`
            }
        };
        let parentFolderRoute = folderRoute.substring(0, name__full__StartIndex);
        let removeDot = parentFolderRoute.substring(1, folderUnit);
        let parentFolder = removeDot.substring(removeDot.lastIndexOf('/') + 1, folderUnit);

        if (parentFolder === '') {
            newRouter.push(route)
        } else {
            let findFolder = function(arr) {
                if (arr) {
                    let parentIndex = arr.findIndex(x => x.name === parentFolder);
                    if (parentIndex !== (-1)) {
                        arr[parentIndex].children.push(route)
                    } else {
                        for (let i = 0; i < arr.length; i++) {
                            findFolder(arr[i].children)
                        }
                    }
                }
            }
            findFolder(newRouter)
        }
    })
    return newRouter
}
export default getRouterTree
