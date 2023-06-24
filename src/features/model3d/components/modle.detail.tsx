import React from "react";
interface PropsModleDetail {
  data?: string;
}
export function ModleDetail(props: PropsModleDetail) {
  return (
    <div className="p-8 rounded-[8px] bg-slate-300 absolute top-[120px] right-8">
      {props.data}
    </div>
  );
}

export default ModleDetail;
