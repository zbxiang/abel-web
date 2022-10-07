/**
 * 用户列表对象模型
 */
export interface UserModelType {
  id: number;
  avatar?: string;
  mobile: string;
  email: string;
  gender: number;
  departmentName?: string;
  departmentId: number | string;
  roleName?: string;
  roleId: number | string;
  status: number;
  nickName: string;
  password: string;
}

/**
 * 角色列表对象模型
 */
export interface RoleModelType {
  id: number;
  name: string;
  roleCode: string;
  description: string;
  createTime: string;
}

/**
 * 部门列表对象模型
 */
export interface DepartmentModelType {
  id: number;
  parentIds: any[];
  name: string;
  code: string;
  order: number;
  status: number;
  children: Array<DepartmentModelType>;
}

/**
 * 菜单列表对象模型
 */
export interface MenuModelType {
  menuUrl: string;
  menuName: string;
  icon: string;
  tip: string | number;
  parentPath: string;
  children: MenuModelType[];
  isSelect: boolean;
}
