'use server'

import { getAttendanceReport, getMyAttendanceReport } from '@/actions/report.actions';
import { getTeamLeaveRequests, getMyLeaveRequests } from '@/actions/leave.actions';
import { getCompanyDirectory, getSquad, getPendingUsers } from '@/actions/user.actions';
import { getMyHistory, getActiveLog } from '@/actions/attendance.actions';
import { getLandingContent } from '@/actions/admin.actions';

export async function fetchOverviewData(role: string, userId: string) {
  const [
    leadershipChartData,
    employeeChartData,
    history,
    activeLog,
    myLeavesRes,
    teamLeavesRes,
    companyDirectory,
    squad
  ] = await Promise.all([
    (role !== 'employee') ? getAttendanceReport().catch(()=>[]) : Promise.resolve([]),
    (role === 'employee') ? getMyAttendanceReport().catch(()=>[]) : Promise.resolve([]),
    getMyHistory(userId).catch(()=>[]),
    getActiveLog(userId).catch(()=>null),
    getMyLeaveRequests().catch(()=>({success:false, data:[]})),
    (role !== 'employee') ? getTeamLeaveRequests().catch(()=>({success:false, data:[]})) : Promise.resolve({success:true, data:[]}),
    (role === 'ceo' || role === 'manager') ? getCompanyDirectory().catch(()=>[]) : Promise.resolve([]),
    (role === 'tl') ? getSquad(userId).catch(()=>[]) : Promise.resolve([])
  ]);

  const chartData = role === 'employee' ? employeeChartData : leadershipChartData;
  const teamLeaves = (teamLeavesRes && teamLeavesRes.success && teamLeavesRes.data) ? teamLeavesRes.data : [];
  const myLeaves = (myLeavesRes && myLeavesRes.success && myLeavesRes.data) ? myLeavesRes.data : [];

  let totalHours = 0;
  let avgHoursPerDay = '0.0';
  let pendingLeavesCount = 0;
  let totalMembers = 0;
  let myRecentHours = 0;
  let myActiveLeaveCount = 0;

  if (role === 'ceo' || role === 'manager' || role === 'tl') {
    totalHours = chartData.reduce((sum: number, day: any) => sum + day.hours, 0);
    avgHoursPerDay = chartData.length ? (totalHours / chartData.length).toFixed(1) : '0.0';
    pendingLeavesCount = teamLeaves.filter((l: any) => l.status === 'Pending').length;
    totalMembers = (role === 'tl') ? squad.length : companyDirectory.length;
  } else {
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    myRecentHours = history
      .filter((l: any) => l.status === 'Completed' && new Date(l.checkIn) >= thirtyDaysAgo)
      .reduce((sum: number, l: any) => sum + (l.hours || 0), 0);
    myActiveLeaveCount = myLeaves.filter((l: any) => l.status === 'Pending' || l.status === 'Approved').length;
  }

  return {
    chartData,
    history,
    activeLog,
    myLeaves,
    teamLeaves,
    companyDirectory,
    squad,
    totalHours,
    avgHoursPerDay,
    pendingLeavesCount,
    totalMembers,
    myRecentHours,
    myActiveLeaveCount
  };
}

export async function fetchBackgroundData(role: string, userId: string) {
  const [
    pendingUsers,
    landingContent
  ] = await Promise.all([
    (role === 'ceo' || role === 'manager') ? getPendingUsers().catch(()=>[]) : Promise.resolve([]),
    (role === 'ceo' || role === 'manager') ? getLandingContent().catch(()=>({})) : Promise.resolve({})
  ]);

  return {
    pendingUsers,
    landingContent
  };
}
