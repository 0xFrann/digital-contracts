import { Tag } from "antd";
import { PresetStatusColorType } from "antd/lib/_util/colors";
import { TContractStatus } from "../types/Contracts";

const StatusAndColor: { [status in TContractStatus]: PresetStatusColorType } = {
  created: "warning",
  signed: "processing",
  approved: "success",
  canceled: "error",
};

const ContractStatus = ({ status }: { status: TContractStatus }): React.ReactElement => {
  return <Tag color={StatusAndColor[status]}>{status[0].toUpperCase(0) + status.slice(1)}</Tag>;
};

export default ContractStatus;
