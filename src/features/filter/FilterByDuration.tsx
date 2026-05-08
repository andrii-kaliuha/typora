import { useDispatch, useSelector } from "react-redux";
import { setDurationMin, setDurationMax } from "../../store/filterSlice";
import type { RootState } from "../../store/index";
import { Title } from "./FilterList";
import { useTranslation } from "react-i18next";
import { FilterSelect } from "./FilterSelect";
import "./Filter.css";
import type { Option } from "../../shared/types/types";

const durationList = [0, 30, 60, 90, 120, 150];

export const FilterByDuration = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { durationMin, durationMax } = useSelector((state: RootState) => state.filter);

  const maxOptions: Option[] = durationList.filter((opt) => opt > durationMin).map((opt) => ({ value: String(opt), label: String(opt) }));
  const minOptions: Option[] = durationList.filter((opt) => opt < durationMax).map((opt) => ({ value: String(opt), label: String(opt) }));

  return (
    <div>
      <Title text={t("history.filter.duration.title")} />
      <div className="filter-list">
        <div className="filter-item duration">
          <p>{t("history.filter.duration.less-than")}</p>
          <FilterSelect
            options={maxOptions}
            currentOption={String(durationMax)}
            onChange={(value) => dispatch(setDurationMax(Number(value)))}
          />
        </div>
        <div className="filter-item duration">
          <p>{t("history.filter.duration.more-than")}</p>
          <FilterSelect
            options={minOptions}
            currentOption={String(durationMin)}
            onChange={(value) => dispatch(setDurationMin(Number(value)))}
          />
        </div>
      </div>
    </div>
  );
};
