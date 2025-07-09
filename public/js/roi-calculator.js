// ROI Calculator for RepSpheres Premium Pricing

document.addEventListener('DOMContentLoaded', function() {
    const calculator = {
        slider: document.getElementById('incomeSlider'),
        incomeValue: document.getElementById('incomeValue'),
        potentialIncome: document.getElementById('potentialIncome'),
        incomeGain: document.getElementById('incomeGain'),
        roiMultiple: document.getElementById('roiMultiple'),
        
        // Pricing tiers (monthly)
        tiers: {
            archive: 19,
            intelligence: 149,
            professional: 399,
            elite: 799,
            syndicate: 1499,
            empire: 2999
        },
        
        // Productivity gain percentage
        productivityGain: 0.40, // 40% gain
        
        init() {
            if (!this.slider) return;
            
            // Set initial values
            this.updateCalculations();
            
            // Add event listeners
            this.slider.addEventListener('input', () => this.updateCalculations());
            
            // Add tier comparison
            this.addTierComparison();
            
            // Add animation to numbers
            this.animateNumbers();
        },
        
        updateCalculations() {
            const currentIncome = parseInt(this.slider.value);
            const potentialIncome = currentIncome * (1 + this.productivityGain);
            const incomeGain = potentialIncome - currentIncome;
            
            // Update display values with formatting
            this.incomeValue.textContent = this.formatCurrency(currentIncome);
            this.potentialIncome.textContent = this.formatCurrency(potentialIncome);
            this.incomeGain.textContent = this.formatCurrency(incomeGain);
            
            // Calculate ROI for Professional tier
            const professionalYearlyCost = this.tiers.professional * 12;
            const roi = Math.round(incomeGain / professionalYearlyCost);
            this.roiMultiple.textContent = roi;
            
            // Update tier recommendations
            this.updateTierRecommendations(currentIncome, incomeGain);
            
            // Add visual feedback
            this.updateVisualFeedback(roi);
        },
        
        formatCurrency(amount) {
            return Math.round(amount).toLocaleString('en-US');
        },
        
        updateTierRecommendations(income, gain) {
            // Calculate best tier based on income
            let recommendedTier = 'professional';
            
            if (income < 150000) {
                recommendedTier = 'intelligence';
            } else if (income >= 300000) {
                recommendedTier = 'elite';
            } else if (income >= 500000) {
                recommendedTier = 'syndicate';
            }
            
            // Highlight recommended tier
            document.querySelectorAll('.pricing-card').forEach(card => {
                card.classList.remove('recommended');
            });
            
            const recommendedCard = document.querySelector(`.pricing-card.${recommendedTier}`);
            if (recommendedCard) {
                recommendedCard.classList.add('recommended');
                
                // Add recommendation badge
                let badge = recommendedCard.querySelector('.recommendation-badge');
                if (!badge) {
                    badge = document.createElement('div');
                    badge.className = 'recommendation-badge';
                    recommendedCard.appendChild(badge);
                }
                badge.textContent = 'RECOMMENDED FOR YOU';
            }
            
            // Update all ROI badges
            this.updateAllROIBadges(gain);
        },
        
        updateAllROIBadges(yearlyGain) {
            Object.entries(this.tiers).forEach(([tier, monthlyPrice]) => {
                const card = document.querySelector(`.pricing-card.${tier}`);
                if (!card) return;
                
                const yearlyCost = monthlyPrice * 12;
                const roi = Math.round(yearlyGain / yearlyCost);
                
                let roiBadge = card.querySelector('.roi-badge');
                if (!roiBadge) {
                    roiBadge = document.createElement('div');
                    roiBadge.className = 'roi-badge';
                    const features = card.querySelector('ul');
                    if (features) {
                        features.parentNode.insertBefore(roiBadge, features.nextSibling);
                    }
                }
                
                if (roi > 0) {
                    roiBadge.textContent = `${roi}X ROI on your investment`;
                    roiBadge.style.display = 'block';
                } else {
                    roiBadge.style.display = 'none';
                }
            });
        },
        
        updateVisualFeedback(roi) {
            const calculator = document.querySelector('.roi-calculator');
            if (!calculator) return;
            
            // Remove existing classes
            calculator.classList.remove('roi-low', 'roi-medium', 'roi-high', 'roi-extreme');
            
            // Add appropriate class based on ROI
            if (roi < 5) {
                calculator.classList.add('roi-low');
            } else if (roi < 10) {
                calculator.classList.add('roi-medium');
            } else if (roi < 20) {
                calculator.classList.add('roi-high');
            } else {
                calculator.classList.add('roi-extreme');
            }
        },
        
        addTierComparison() {
            const comparisonContainer = document.createElement('div');
            comparisonContainer.className = 'tier-comparison';
            comparisonContainer.innerHTML = `
                <h4>Investment Comparison</h4>
                <div class="comparison-grid">
                    <div class="comparison-item">
                        <span class="comparison-label">Annual Investment</span>
                        <span class="comparison-value" id="annualInvestment">$4,788</span>
                    </div>
                    <div class="comparison-item">
                        <span class="comparison-label">Monthly Gain</span>
                        <span class="comparison-value" id="monthlyGain">$6,667</span>
                    </div>
                    <div class="comparison-item">
                        <span class="comparison-label">Payback Period</span>
                        <span class="comparison-value" id="paybackPeriod">0.7 months</span>
                    </div>
                </div>
            `;
            
            const calculator = document.querySelector('.roi-calculator');
            if (calculator) {
                calculator.appendChild(comparisonContainer);
            }
        },
        
        animateNumbers() {
            const animateValue = (element, start, end, duration) => {
                const startTime = performance.now();
                const difference = end - start;
                
                const animate = (currentTime) => {
                    const elapsed = currentTime - startTime;
                    const progress = Math.min(elapsed / duration, 1);
                    
                    const value = Math.floor(start + difference * this.easeOutQuart(progress));
                    element.textContent = this.formatCurrency(value);
                    
                    if (progress < 1) {
                        requestAnimationFrame(animate);
                    }
                };
                
                requestAnimationFrame(animate);
            };
            
            // Animate on first load
            if (this.potentialIncome) {
                const targetValue = parseInt(this.slider.value) * (1 + this.productivityGain);
                animateValue(this.potentialIncome, parseInt(this.slider.value), targetValue, 1000);
            }
        },
        
        easeOutQuart(t) {
            return 1 - Math.pow(1 - t, 4);
        }
    };
    
    // Initialize calculator
    calculator.init();
    
    // Add income bracket insights
    const addIncomeInsights = () => {
        const insights = document.createElement('div');
        insights.className = 'income-insights';
        insights.innerHTML = `
            <div class="insight-cards">
                <div class="insight-card">
                    <h5>$150K Earners</h5>
                    <p>Invest 3% to gain 40%</p>
                </div>
                <div class="insight-card">
                    <h5>$250K Earners</h5>
                    <p>Invest 2% to gain 40%</p>
                </div>
                <div class="insight-card">
                    <h5>$400K Earners</h5>
                    <p>Invest 1.5% to gain 25%</p>
                </div>
            </div>
        `;
        
        const pricingSection = document.querySelector('.pricing-section');
        if (pricingSection) {
            pricingSection.appendChild(insights);
        }
    };
    
    // Add comparison to competitors
    const addCompetitorComparison = () => {
        const comparison = document.createElement('div');
        comparison.className = 'competitor-comparison';
        comparison.innerHTML = `
            <h3>Compare to the Competition</h3>
            <div class="comparison-table">
                <div class="comparison-row">
                    <span class="competitor">Salesforce</span>
                    <span class="their-price">$300/month</span>
                    <span class="their-features">Just a database</span>
                </div>
                <div class="comparison-row">
                    <span class="competitor">Gong</span>
                    <span class="their-price">$200/month</span>
                    <span class="their-features">Just call recording</span>
                </div>
                <div class="comparison-row highlight">
                    <span class="competitor">RepSpheres</span>
                    <span class="their-price">$399/month</span>
                    <span class="their-features">Both PLUS AI coaching</span>
                </div>
            </div>
        `;
        
        const roiCalc = document.querySelector('.roi-calculator');
        if (roiCalc) {
            roiCalc.parentNode.insertBefore(comparison, roiCalc.nextSibling);
        }
    };
    
    // Initialize additional features
    setTimeout(() => {
        addIncomeInsights();
        addCompetitorComparison();
    }, 100);
});

// Annual pricing toggle
document.addEventListener('DOMContentLoaded', function() {
    const createPricingToggle = () => {
        const toggle = document.createElement('div');
        toggle.className = 'pricing-toggle';
        toggle.innerHTML = `
            <span class="toggle-label">Monthly</span>
            <div class="toggle-switch" id="billingToggle">
                <span class="toggle-slider"></span>
            </div>
            <span class="toggle-label">Annual</span>
            <span class="savings-badge">Save 20%</span>
        `;
        
        const pricingSection = document.querySelector('.pricing-section h2');
        if (pricingSection) {
            pricingSection.parentNode.insertBefore(toggle, pricingSection.nextSibling);
        }
        
        // Toggle functionality
        const toggleSwitch = document.getElementById('billingToggle');
        let isAnnual = false;
        
        toggleSwitch.addEventListener('click', () => {
            isAnnual = !isAnnual;
            toggleSwitch.classList.toggle('active');
            updatePricing(isAnnual);
        });
    };
    
    const updatePricing = (isAnnual) => {
        const discountRate = 0.8; // 20% off
        
        document.querySelectorAll('.pricing-card').forEach(card => {
            const amountEl = card.querySelector('.amount');
            const periodEl = card.querySelector('.period');
            
            if (amountEl && periodEl) {
                const monthlyPrice = parseInt(amountEl.getAttribute('data-monthly') || amountEl.textContent);
                
                if (!amountEl.hasAttribute('data-monthly')) {
                    amountEl.setAttribute('data-monthly', monthlyPrice);
                }
                
                if (isAnnual) {
                    const annualMonthly = Math.round(monthlyPrice * discountRate);
                    amountEl.textContent = annualMonthly;
                    periodEl.textContent = '/month billed annually';
                } else {
                    amountEl.textContent = monthlyPrice;
                    periodEl.textContent = '/month';
                }
            }
        });
    };
    
    createPricingToggle();
});