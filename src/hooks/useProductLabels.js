import { useQuery } from '@tanstack/react-query';
import apiClient from '../api/client';
import DEFAULTS from '../data/productLabelsDefaults.json';

// Flat CMS labels for the product catalog + detail pages. Empty saved values
// are kept empty so the golden rule hides the element (no default returns).
const useProductLabels = () => {
  const { data } = useQuery({
    queryKey: ['prod-labels'],
    queryFn: async () => {
      try {
        const res = await apiClient.get('/pages/products/sections?includeHidden=true');
        return res.data || [];
      } catch { return []; }
    },
  });
  const rec = (data || []).find((s) => s && s.key === 'prod_detail_labels' && s.visible !== false);
  const saved = rec?.content || {};
  const txt = (v) => (v ?? '').toString().trim();
  const labels = {};
  for (const [k, def] of Object.entries(DEFAULTS)) {
    labels[k] = saved[k] !== undefined && saved[k] !== null ? txt(saved[k]) : def;
  }
  return labels;
};

export default useProductLabels;
