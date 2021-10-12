import { baseUrl, embedAuthUrl, baseUrlCIS } from "./authConfig.js";
import axios from "axios";

export async function getPlants() {
    return await axios.get(`${baseUrl}/api/plants/`);
}

export async function getPlantByName(name) {
    return await axios.get(`${baseUrl}/api/plants/?name=${name}`);
}

export async function postPlant(json) {
    return  axios.post(`${baseUrl}/api/plants/`,json);
}

export async function postTeam(json) {
    return  axios.post(`${baseUrl}/api/teams/`,json);
}

export async function getTeams() {
    return  axios.get(`${baseUrl}/api/teams/`);
}

export async function getCategories() {
    return await axios.get(`${baseUrl}/api/categories/`);
}

export async function getUserByEmail(email) {
    return  axios.get(`${baseUrl}/api/users/?email=${email}`);
}

export async function postUser(json) {
    return  axios.post(`${baseUrl}/api/users/`,json);
}

export async function getToken(workspaceId,reportId) {
    return  axios.get(`${embedAuthUrl}?workspaceId=${workspaceId}&reportId=${reportId}`);
}

export async function getReportPages(id) {
    return  axios.get(`${baseUrl}/api/pages/?page_report__in=${id}`);
}

export async function getPages() {
    return  axios.get(`${baseUrl}/api/pages/`);
}

export async function getPageOptions() {
    return  axios.options(`${baseUrl}/api/pages/`);
}

export async function postPage(json) {
    return  axios.post(`${baseUrl}/api/pages/`,json);
}

export async function putPage(id,json) {
    return  axios.put(`${baseUrl}/api/pages/${id}/`,json);
}

export async function getLinkWorkspaces(plant_id,depth) {
    return  axios.get(`${baseUrl}/api/linkworkspaces/?plant=${plant_id}&depth=${depth}`);
}

export async function getLinkWorkspacesByTag(id,depth) {
    return  axios.get(`${baseUrl}/api/linkworkspaces/?tag=${id}&depth=${depth}`);
}

export async function getLinkWorkspace(workspace_id,depth) {
    return  axios.get(`${baseUrl}/api/linkworkspaces/${workspace_id}/?depth=${depth}`);
}

export async function getLinks() {
    return  axios.get(`${baseUrl}/api/links/`);
}

export async function getLinksByIds(ids) {
    return  axios.get(`${baseUrl}/api/links/?id__in=${ids}`);
}

export async function getLinksByTagId(id,depth) {
    return  axios.get(`${baseUrl}/api/links/?tag=${id}&depth=${depth}`);
}

export async function getLinksByPlantId(plant_id) {
    return  axios.get(`${baseUrl}/api/links/?plant=${plant_id}`);
}

export async function getLink(link_id) {
    return  axios.get(`${baseUrl}/api/links/${link_id}/`);
}

export async function getSidebarlink(plant_id,depth) {
    return  axios.get(`${baseUrl}/api/sidebarlinks/?depth=${depth}&plant=${plant_id}`);
}

export async function getSidebarlinks(depth) {
    return  axios.get(`${baseUrl}/api/sidebarlinks/?depth=${depth}`);
}

export async function getPods(depth) {
    return  axios.get(`${baseUrl}/api/pods/?depth=${depth}`);
}

export async function getPlantPods(plant_id,depth) {
    return  axios.get(`${baseUrl}/api/pods/?depth=${depth}&plant=${plant_id}`);
}

export async function getStream(id,depth) {
    return  axios.get(`${baseUrlCIS}/APIs/LaunchPad/getStreamsById.php?depth=${depth}&id=${id}`);
}

export async function getPod(id,depth) {
    return  axios.get(`${baseUrlCIS}/APIs/LaunchPad/getPodsById.php?depth=${depth}&id=${id}`);
}

export async function getStreamById(id) {
    return  axios.get(`${baseUrlCIS}/APIs/LaunchPad/streams.php?id=${id}`);
}

export async function getWorkspace(id) {
    return await axios.get(`${baseUrlCIS}/APIs/LaunchPad/workspaces.php?id=${id}`);
}

export async function getReports() {
    return  axios.get(`${baseUrlCIS}/APIs/LaunchPad/reports.php`);
}

export async function getReport(id) {
    return await axios.get(`${baseUrlCIS}/APIs/LaunchPad/reports.php?id=${id}`);
}

export async function getPodById(id) {
    return  axios.get(`${baseUrlCIS}/APIs/LaunchPad/pods.php?id=${id}/`);
}

export async function getTags() {
    return  axios.get(`${baseUrl}/api/tags/`);
}

