type UpgradeLinkProps = {
  compact?: boolean;
};

export function UpgradeLink({ compact = false }: UpgradeLinkProps) {
  return (
    <a
      className={`account-signin${compact ? " account-signin-compact" : ""}`}
      href="https://animatedwebs.com/pricing"
    >
      <span>Get Pro</span>
    </a>
  );
}
