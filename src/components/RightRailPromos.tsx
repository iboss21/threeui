
type RightRailPromosProps = {
  onPricing: () => void;
};

export function RightRailPromos({ onPricing }: RightRailPromosProps) {
  return (
    <div className="rail-promos">
      <button className="pro-promo card" onClick={onPricing}>
        <span className="rail-section-label">GET PRO</span>
        <strong>AnimatedWebs Pro: cinematic templates, UI generator and MCP.</strong>
        <span className="pro-promo-link">
          <span className="pro-promo-divider" aria-hidden="true">|</span>
          See plans
        </span>
      </button>

      <section className="sponsor-block" aria-labelledby="sponsors-title">
        <h2 className="rail-section-label" id="sponsors-title">Sponsors</h2>
        <a
          className="sponsor-slot inset-shadow"
          href="https://animatedwebs.com/contact?topic=sponsor"
          aria-label="Ask about the open AnimatedWebs UI sponsor slot"
        >
          <span>Open sponsor slot</span>
        </a>
        <a
          className="become-sponsor"
          href="https://animatedwebs.com/contact?topic=sponsor"
        >
          Become a sponsor <span aria-hidden="true">→</span>
        </a>
      </section>
    </div>
  );
}
