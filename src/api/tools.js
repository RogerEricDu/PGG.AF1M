// 封装所有和用户相关的接口函数
import request from '@/utils/request'

// 上传 SNP 文件
export function uploadSNPFile(formData) {
return request({
    url: '/upload/submit',
    method: 'post',
    data: formData,
    headers: {
    'Content-Type': 'multipart/form-data'
    }
});
}

// 获取用户上传记录
export function getUploadRecords(email) {
return request({
    url: '/upload/records',
    method: 'get',
    params: { email }
});
}

// 获取下载文件的 URL
export function getDownloadUrl(path) {
return `/upload/download?path=${encodeURIComponent(path)}`;
}


// 启动插补任务
export function startImputation(file, taskName, panel) {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('taskName', taskName);
    formData.append('panel', panel);

    return request({
        url: '/imputation/run',
        method: 'post',
        data: formData,
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
}

// 获取任务状态
export function getImputationTaskStatus(taskName) {
    return request({
        url: `/imputation/status/${taskName}`,
        method: 'get',
    });
}

// 获取任务记录
export function getRecord(id) {
    return request({
        url: `/imputation/record/${id}`,
        method: 'get',
    });
}

// 下载插补结果文件
export function downloadImputedFile(taskName) {
    return request({
        url: `/imputation/download/${taskName}`,
        method: 'get',
        responseType: 'blob',
    }).then((response) => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', `imputed_${taskName}.vcf`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    });
}
// 运行 GWAS 分析
export function runGwasAnalysis(file, taskName, threshold, model) {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('taskName', taskName);
    formData.append('threshold', threshold);
    formData.append('model', model);

    return request({
        url: '/gwas/run',
        method: 'post',
        data: formData,
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
}

// 获取任务状态
export function getTaskStatus(taskName) {
    return request({
        url: `/gwas/status/${taskName}`,
        method: 'get',
    });
}

// 获取所有任务
export function getAllTasks() {
    return request({
        url: '/gwas/tasks',
        method: 'get',
    });
}

// 获取结果预览
export function getResultsPreview(taskName) {
    return request({
        url: `/gwas/preview/${taskName}`,
        method: 'get',
    });
}

// 下载结果文件
export function downloadResults(taskName) {
    return request({
        url: `/gwas/download/${taskName}`,
        method: 'get',
        responseType: 'blob',
    }).then((response) => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', `${taskName}_results.txt`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    });
}

//上传DeepSeek接口
export function selectDeepSeek(data) {
    return request({
        url: '/tools/selectDeepSeek',
        method: 'post',
        data
    })
}

//查询总体的文件状态
export function selectResult(data) {
    return request({
        url: '/tools/selectResult',
        method: 'post',
        data
    })
}
