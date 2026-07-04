import { NavLink } from "react-router-dom";
import { primaryNav, utilityNav, askAi, createAction } from "../../data/nav.js";
import { Popover, MenuItem } from "../primitives/Popover.jsx";
import { cn } from "../../lib/cn.js";

function itemClasses(active) {
  return cn(
    "group flex w-full flex-col items-center gap-1 rounded-md py-2 transition-colors",
    active ? "bg-white/10" : "hover:bg-white/5"
  );
}

function Label({ active, children }) {
  return (
    <span className={cn("text-xs font-medium", active ? "text-white" : "text-white/60 group-hover:text-white/90")}>
      {children}
    </span>
  );
}

function NavButton({ item }) {
  const Icon = item.icon;
  return (
    <NavLink to={item.to} title={item.label} className={({ isActive }) => itemClasses(isActive)}>
      {({ isActive }) => (
        <>
          <Icon size={24} strokeWidth={2} className={isActive ? "text-white" : "text-white/60 group-hover:text-white/90"} />
          <Label active={isActive}>{item.label}</Label>
        </>
      )}
    </NavLink>
  );
}

export function Sidebar({ aiOpen, onToggleAi }) {
  const AskIcon = askAi.icon;
  const CreateIcon = createAction.icon;
  return (
    <nav className="flex h-full w-[75px] shrink-0 flex-col items-center gap-4 rounded-r-top bg-ink px-1 pb-4 pt-1">
      <div className="flex aspect-square w-full items-center justify-center rounded-md bg-black">
        <Logo />
      </div>

      <div className="flex w-full flex-1 flex-col justify-between">
        <div className="flex flex-col gap-2">
          {primaryNav.map((item) => (
            <NavButton key={item.label} item={item} />
          ))}
        </div>

        <div className="flex flex-col gap-2">
          {utilityNav.map((item) => (
            <NavButton key={item.label} item={item} />
          ))}

          {/* Ask AI toggles the assistant drawer */}
          <button type="button" title={askAi.label} onClick={onToggleAi} className={itemClasses(aiOpen)}>
            <AskIcon size={24} strokeWidth={2} className={aiOpen ? "text-white" : "text-white/60"} />
            <Label active={aiOpen}>{askAi.label}</Label>
          </button>

          {/* Create opens a menu */}
          <Popover
            side="top"
            align="start"
            rootClassName="w-full"
            className="min-w-[220px]"
            trigger={
              <button
                type="button"
                title={createAction.label}
                className="flex w-full flex-col items-center gap-1 rounded-md bg-primary py-2 text-white transition-[filter] hover:brightness-110"
              >
                <CreateIcon size={24} strokeWidth={2} />
                <span className="text-xs font-medium">{createAction.label}</span>
              </button>
            }
          >
            {createAction.items.map((label) => (
              <MenuItem key={label}>{label}</MenuItem>
            ))}
          </Popover>
        </div>
      </div>
    </nav>
  );
}

function Logo() {
  return (
    <svg width="34" height="24" viewBox="0 0 34 24" fill="none" aria-label="Fashion Cloud">
      <path
        d="M17 6.2c0-1.7 1.3-3 3-3s3 1.3 3 3c0 1.2-.7 2.2-1.7 2.7L17 11l-15 7.3c-.9.5-1.5 1.4-1.5 2.4V21h33v-.3c0-1-.6-1.9-1.5-2.4L17 11"
        stroke="#fff" strokeWidth="1.6" strokeLinejoin="round" strokeLinecap="round" fill="none"
      />
    </svg>
  );
}
